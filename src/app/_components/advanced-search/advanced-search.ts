import { Component, effect, inject, signal } from '@angular/core';
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
  private modalService = inject(NgbModal);

  protected searchResultsLayerGroup?: L.LayerGroup;

  protected selectedInsertion = signal<InsertionResponseDTO | null>(null);
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

    effect(() => {
      const insertion = this.selectedInsertion();
      if (insertion) {
        this.open();
      }
    });
  }

  protected open() {
    const modalRef = this.modalService.open(InsertionViewModal);
    modalRef.componentInstance.insertion = this.selectedInsertion();
    modalRef.result.then(() => {
      this.selectedInsertion.set(null);
    }, () => {
      this.selectedInsertion.set(null);
    });
  }

  protected onSaveSearch() {
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

    if (!center || !tags || !distance) throw new Error('Center and distance are required for search, tags should not be null but an empty array by default');

    this.client.postSavedSearch(center.lat, center.lng, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator).subscribe({
      next: () => alert('Search saved successfully!'),
      error: (err) => alert('Error saving search: ' + err.message)
    });
  }

  private onFormChanges() {
    if (this.searchForm.invalid) return;

    try {
      const searchResults$: Observable<Page<InsertionResponseDTO>> = this.getSearchResultsObservable();

      searchResults$.subscribe((insertions) => {
        this.searchResultsLayerGroup = L.markerClusterGroup();
        insertions.content.map((insertion) =>
          this.searchResultsLayerGroup!.addLayer(this.initializeMarkerForInsertion(insertion))
        );
      });

    } catch (error) {
      console.error(error);
      return;
    }
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

    if (!center || !tags || !distance) throw new Error('Center and distance are required for search, tags should not be null but an empty array by default');

    switch (insertionType) {
      case this.insertionTypes[1]: // For Sale
        return this.client.searchInsertionsForSale(center, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator, maxPrice);
      case this.insertionTypes[2]: // For Rent
        return this.client.searchInsertionsForRent(center, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator, maxRent);
      default:
        return this.client.searchInsertions(center, distance, tags, minSize, minNumberOfRooms, maxFloor, hasElevator);
    }
  }

  private initializeMarkerForInsertion(insertion: InsertionResponseDTO) {
    const location = insertion.address.location;
    const coords = location.coordinates;
    const coordsLatLng = new L.LatLng(coords[1], coords[0]);
    const marker = L.marker(coordsLatLng, { icon: MapConstants.MARKER_ICON });
    marker.on('click', () => {
      if (this.selectedInsertion() !== insertion) {
        this.selectedInsertion.set(insertion);
      } else {
        this.selectedInsertion.set(null);
      }
    });
    return marker;
  }
}
