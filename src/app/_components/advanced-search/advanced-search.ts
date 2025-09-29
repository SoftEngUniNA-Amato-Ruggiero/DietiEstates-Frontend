import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import * as L from 'leaflet';
import * as MapConstants from '../../_constants/map-component.constants';
import { InsertionResponseDTO } from '../../_types/insertions/InsertionResponseDTO';
import { MapComponent } from '../map-component/map-component';
import { TagsField } from '../tags-field/tags-field';
import { BackendClientService } from '../../_services/backend-client-service';
import { InsertionView } from "../insertion-view/insertion-view";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-advanced-search',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    MapComponent,
    TagsField,
    InsertionView,
    JsonPipe
  ],
  templateUrl: './advanced-search.html',
  styleUrl: './advanced-search.scss'
})
export class AdvancedSearch {
  protected readonly client = inject(BackendClientService);

  protected searchResultsLayerGroup?: L.LayerGroup;

  protected selectedInsertion = signal<InsertionResponseDTO | null>(null);
  protected reactiveKeywords = signal<string[]>([]);

  protected searchForm = new FormGroup({
    center: new FormControl<L.LatLng | undefined>(undefined),
    distance: new FormControl(1),
    tags: new FormControl<string[]>([]),
  });

  constructor() {
    // Patch form values when signals change
    effect(() => {
      const tags = this.reactiveKeywords();
      this.searchForm.patchValue({
        tags: tags
      });
    });

    // Get insertions from backend every time the form changes
    this.searchForm.valueChanges.subscribe(() => this.onFormChanges());
  }

  private onFormChanges() {
    if (this.searchForm.invalid) return;

    const center = this.searchForm.get('center')?.value;
    const tags = this.searchForm.get('tags')?.value;
    const distance = this.searchForm.get('distance')?.value;

    if (!center || !tags || !distance) return;

    this.client.getInsertionsByLocationAndTags(center, distance, tags).subscribe((insertions) => {
      this.searchResultsLayerGroup = L.layerGroup(
        insertions.content.map((insertion) => this.initializeMarkerForInsertion(insertion))
      );
    });
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
