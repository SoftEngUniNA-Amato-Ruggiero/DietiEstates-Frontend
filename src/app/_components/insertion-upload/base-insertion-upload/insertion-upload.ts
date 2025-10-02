import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { FeatureCollection } from 'geojson';
import * as L from 'leaflet';
import * as MapConstants from '../../../_constants/map-component.constants';
import { MapComponent } from '../../map-component/map-component';
import { GeoapifyClientService } from '../../../_services/geoapify-client-service';
import { InsertionRequestDTO } from '../../../_types/insertions/InsertionRequestDTO';
import { TagsField } from "../../tags-field/tags-field";
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-insertion-upload',
  imports: [
    MapComponent,
    MatInputModule,
    MatCheckbox,
    ReactiveFormsModule,
    QuillModule,
    TagsField
  ],
  templateUrl: './insertion-upload.html',
  styleUrl: './insertion-upload.scss'
})
export class InsertionUpload {
  @Output() insertionData = new EventEmitter<InsertionRequestDTO>()

  protected readonly geoapifyClient = inject(GeoapifyClientService);
  protected clickMarkerLayer?: L.Marker;
  protected formattedAddress = signal<string>("No address selected");


  protected insertionForm = new FormGroup({
    address: new FormControl<FeatureCollection | null>(null),
    description: new FormControl<string>(''),
    tags: new FormControl<string[]>([]),
    size: new FormControl<number | undefined>(undefined),
    numberOfRooms: new FormControl<number | undefined>(undefined),
    floor: new FormControl<number | undefined>(undefined),
    hasElevator: new FormControl<boolean | undefined>(undefined),
  });


  constructor() {
    this.insertionForm.valueChanges.subscribe(() => this.onFormChange());
  }


  protected onFormChange() {
    if (!this.insertionForm.valid) return;
    const insertion = new InsertionRequestDTO(
      this.insertionForm.value.tags || [],
      this.insertionForm.value.description || "",
      this.insertionForm.value.address!,
      this.insertionForm.value.size || undefined,
      this.insertionForm.value.numberOfRooms || undefined,
      this.insertionForm.value.floor || undefined,
      this.insertionForm.value.hasElevator || undefined
    );
    this.insertionData.emit(insertion);
  }


  protected onPlaceSelected(event: L.LatLng) {
    this.onMapClicked(event);
  }


  protected onMapClicked($event: L.LatLng) {
    this.setMarker($event);

    this.geoapifyClient.reverseGeocode($event.lat, $event.lng).subscribe({
      next: (result) => {
        console.log("Reverse geocode result:", result);

        this.insertionForm.patchValue({
          address: result
        });
      },
      error: (error) => {
        console.error("Error during reverse geocode:", error);
      }
    });
  }


  private setMarker(pos: L.LatLng) {
    if (!this.clickMarkerLayer) {
      this.initializeClickMarkerLayer(pos);
    } else {
      this.clickMarkerLayer.setLatLng(pos);
    }
  }


  private initializeClickMarkerLayer(clickPos: L.LatLng) {
    this.clickMarkerLayer = L.marker(clickPos, {
      icon: MapConstants.MARKER_ICON,
      draggable: true,
      autoPan: true,
      riseOnHover: true
    });

    this.clickMarkerLayer.on('click', () => {
      this.clickMarkerLayer!.remove();
      this.clickMarkerLayer = undefined;
      this.insertionForm.patchValue({
        address: null
      });
    });

    this.clickMarkerLayer.on('moveend', () => {
      this.onMapClicked(this.clickMarkerLayer!.getLatLng());
    });

    this.clickMarkerLayer.on('mouseover', () => {
      this.clickMarkerLayer!.setOpacity(0.8);
    });

    this.clickMarkerLayer.on('mouseout', () => {
      this.clickMarkerLayer!.setOpacity(1);
    });
  }

}
