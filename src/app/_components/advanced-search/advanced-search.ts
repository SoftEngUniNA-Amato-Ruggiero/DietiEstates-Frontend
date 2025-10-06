import { Component, effect, inject, Input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { debounceTime, Observable } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import * as MapConstants from '../../_constants/map-component.constants';
import { InsertionResponseDTO } from '../../_types/insertions/InsertionResponseDTO';
import { MapComponent } from '../map-component/map-component';
import { TagsField } from '../tags-field/tags-field';
import { BackendClientService } from '../../_services/backend-client-service';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { Page } from '../../_types/page';
import { InsertionViewModal } from '../insertion-view-modal/insertion-view-modal';
import { AuthService } from '../../_services/auth-service';
import { InsertionSearchResultDTO } from '../../_types/insertions/InsertionSearchResultDTO';
import { ToastrService } from 'ngx-toastr';
import { SavedSearchService } from '../../_services/saved-search-service';

@Component({
  selector: 'app-advanced-search',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatCheckbox,
    MapComponent,
    MatRadioModule,
    NgbAccordionModule,
    TagsField
  ],
  templateUrl: './advanced-search.html',
  styleUrl: './advanced-search.scss'
})
export class AdvancedSearch {
  protected readonly client = inject(BackendClientService);
  protected readonly authService = inject(AuthService);
  protected readonly toastr = inject(ToastrService);
  private readonly modalService = inject(NgbModal);
  private readonly savedSearchService = inject(SavedSearchService);

  protected searchResultsLayerGroup?: L.LayerGroup;

  protected map?: L.Map;
  protected selectedInsertion = signal<InsertionResponseDTO | null>(null);
  protected selectedInsertionId = signal<number | undefined>(undefined);
  protected reactiveKeywords = signal<string[]>([]);
  protected insertionTypes: string[] = ['Any', 'For Sale', 'For Rent'];

  protected searchForm = new FormGroup({
    center: new FormControl<L.LatLng | undefined>(undefined),
    distance: new FormControl(1),
    insertionType: new FormControl<string>('Any'),
    tags: new FormControl<string[]>([]),
    minSize: new FormControl<number | undefined>(undefined),
    minNumberOfRooms: new FormControl<number | undefined>(undefined),
    maxFloor: new FormControl<number | undefined>(undefined),
    hasElevator: new FormControl<boolean | undefined>(undefined),
    maxRent: new FormControl<number | undefined>(undefined),
    maxPrice: new FormControl<number | undefined>(undefined),
  });

  constructor() {

    // Patch form values when signals change
    effect(() => {
      const tags = this.reactiveKeywords();
      this.searchForm.patchValue({
        tags: tags
      });
    });

    // Get insertions from backend every time the form changes, with 500ms debounce
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.onFormChanges());

    // Get insertion details from backend when an insertion is selected on the map
    effect(() => {
      const id = this.selectedInsertionId();
      if (!id) return;
      this.client.getInsertionById(id).subscribe((insertion) => {
        this.selectedInsertion.set(insertion);
      });
    });

    // Open modal when an insertion is selected
    effect(() => {
      const insertion = this.selectedInsertion();
      if (insertion) {
        this.open();
      }
    });

    // Show saved search results when they are set
    effect(() => {
      const savedSearchResults = this.savedSearchService.savedSearchResults();
      if (savedSearchResults) {
        this.showSearchResults(savedSearchResults);
        //TODO: also update the form values to reflect the saved search
      }
    });
  }

  protected open() {
    const modalRef = this.modalService.open(InsertionViewModal);
    modalRef.componentInstance.insertion = this.selectedInsertion();
    modalRef.componentInstance.isConfirmationModal = false;
    modalRef.result.then(() => {
      this.selectedInsertion.set(null);
    }, () => {
      this.selectedInsertion.set(null);
    });
  }

  protected onSaveSearch() {
    const savedSearch$ = this.postSavedSearchObservable();
    if (!savedSearch$) {
      this.toastr.error('Error saving search: Missing required fields');
      return;
    }
    savedSearch$.subscribe({
      next: () => {
        this.toastr.success('Search saved successfully');
        this.savedSearchService.reloadSavedSearches.set(true);
      },
      error: (err) => this.toastr.error('Error saving search: ' + err.message),
    });
  }

  private postSavedSearchObservable() {
    const center = this.searchForm.get('center')?.value;
    const tags = this.searchForm.get('tags')?.value;
    const distance = this.searchForm.get('distance')?.value;
    const minSize = this.searchForm.get('minSize')?.value ?? undefined;
    const minNumberOfRooms = this.searchForm.get('minNumberOfRooms')?.value ?? undefined;
    const maxFloor = this.searchForm.get('maxFloor')?.value ?? undefined;
    const hasElevator = this.searchForm.get('hasElevator')?.value ? true : undefined;
    const insertionType = this.searchForm.get('insertionType')?.value;
    const maxRent = this.searchForm.get('maxRent')?.value ?? undefined;
    const maxPrice = this.searchForm.get('maxPrice')?.value ?? undefined;

    if (!center || !tags || !distance) {
      if (!center) console.error('Center is required to save search');
      if (!tags) console.error('Tags are required to save search');
      if (!distance) console.error('Distance is required to save search');
      return;
    }

    switch (insertionType) {
      case this.insertionTypes[1]: // For Sale
        return this.client.postSavedSearchForSale(center.lat, center.lng, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator, maxPrice);
      case this.insertionTypes[2]: // For Rent
        return this.client.postSavedSearchForRent(center.lat, center.lng, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator, maxRent);
      default:
        return this.client.postSavedSearch(center.lat, center.lng, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator);
    }
  }

  private onFormChanges() {
    if (this.searchForm.invalid) return;

    try {
      const searchResults$ = this.getSearchResultsObservable();
      if (!searchResults$) return;
      searchResults$.subscribe((insertions) => {
        this.showSearchResults(insertions);
      });

    } catch (error) {
      console.error(error);
      return;
    }
  }

  private showSearchResults(insertions: Page<InsertionSearchResultDTO>) {
    this.searchResultsLayerGroup = L.markerClusterGroup();
    insertions.content.map((insertion) => this.searchResultsLayerGroup!.addLayer(this.initializeMarkerForInsertion(insertion))
    );
  }

  private getSearchResultsObservable() {
    const center = this.searchForm.get('center')?.value;
    const tags = this.searchForm.get('tags')?.value;
    const distance = this.searchForm.get('distance')?.value;
    const minSize = this.searchForm.get('minSize')?.value ?? undefined;
    const minNumberOfRooms = this.searchForm.get('minNumberOfRooms')?.value ?? undefined;
    const maxFloor = this.searchForm.get('maxFloor')?.value ?? undefined;
    const hasElevator = this.searchForm.get('hasElevator')?.value ? true : undefined;
    const insertionType = this.searchForm.get('insertionType')?.value;
    const maxRent = this.searchForm.get('maxRent')?.value ?? undefined;
    const maxPrice = this.searchForm.get('maxPrice')?.value ?? undefined;

    if (!center || !tags || !distance) {
      if (!center) console.error('Center is required to search');
      if (!tags) console.error('Tags are required to search');
      if (!distance) console.error('Distance is required to search');
      return;
    }

    switch (insertionType) {
      case this.insertionTypes[1]: // For Sale
        return this.client.searchInsertionsForSale(center, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator, maxPrice);
      case this.insertionTypes[2]: // For Rent
        return this.client.searchInsertionsForRent(center, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator, maxRent);
      default:
        return this.client.searchInsertions(center, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator);
    }
  }

  private initializeMarkerForInsertion(insertion: InsertionSearchResultDTO) {
    const location = insertion.location;
    const coords = location.coordinates;
    const coordsLatLng = new L.LatLng(coords[1], coords[0]);
    const marker = L.marker(coordsLatLng, { icon: MapConstants.MARKER_ICON });
    marker.on('click', () => {
      if (this.selectedInsertionId() !== insertion.id) {
        this.selectedInsertionId.set(insertion.id);
      } else {
        this.selectedInsertionId.set(undefined);
      }
    });
    return marker;
  }
}
