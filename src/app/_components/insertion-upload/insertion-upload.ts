import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import * as L from 'leaflet';
import * as MapConstants from '../../_constants/map-component.constants';
import { MapComponent } from '../map-component/map-component';
import { BackendClientService } from '../../_services/backend-client-service';
import { GeoapifyClientService } from '../../_services/geoapify-client-service';
import { Insertion } from '../../_types/insertion';
import { UserStateService } from '../../_services/user-state-service';

@Component({
  selector: 'app-insertion-upload',
  imports: [MapComponent, ReactiveFormsModule, QuillModule],
  templateUrl: './insertion-upload.html',
  styleUrl: './insertion-upload.scss'
})
export class InsertionUpload {
  protected readonly client = inject(BackendClientService);
  protected readonly geoapifyClient = inject(GeoapifyClientService);
  protected readonly userService = inject(UserStateService);

  protected insertionForm = new FormGroup({
    address: new FormControl(''),
    location: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('')
  });

  protected clickMarkerLayer?: L.Marker;

  protected initializeClickMarkerLayer(clickPos: L.LatLng) {
    this.clickMarkerLayer = L.marker(clickPos, {
      icon: MapConstants.MARKER_ICON,
      draggable: true,
      autoPan: true,
      riseOnHover: true
    });

    this.clickMarkerLayer.on('click', () => {
      console.log("Marker clicked: logging latLng ", this.clickMarkerLayer!.getLatLng());
    });

    this.clickMarkerLayer.on('dblclick', () => {
      console.log("Marker double-clicked: logging GeoJSON ", this.clickMarkerLayer!.toGeoJSON());

      this.geoapifyClient.reverseGeocode(clickPos.lat, clickPos.lng).subscribe({
        next: (result) => {
          console.log("Reverse geocode result:", result);
        },
        error: (error) => {
          console.error("Error during reverse geocode:", error);
        }
      });
    });

    this.clickMarkerLayer.on('moveend', () => {
      console.log("Marker moved to ", this.clickMarkerLayer!.getLatLng());
    });

    this.clickMarkerLayer.on('mouseover', () => {
      this.clickMarkerLayer!.setOpacity(0.7);
    });

    this.clickMarkerLayer.on('mouseout', () => {
      this.clickMarkerLayer!.setOpacity(1);
    });
  }

  protected onPlaceSelected($event: any) {
    this.insertionForm.patchValue({
      address: $event.properties!['formatted'],
      location: JSON.stringify($event.geometry.coordinates)
    });
  }

  protected onMapClicked($event: L.LatLng) {
    if (!this.clickMarkerLayer) {
      this.initializeClickMarkerLayer($event);
    } else {
      this.clickMarkerLayer.setLatLng($event);
    }
  }

  protected onSubmit() {
    if (this.insertionForm.valid) {
      const insertion = new Insertion(
        this.insertionForm.value.address!,
        this.insertionForm.value.location!,
        {
          description: this.insertionForm.value.description!
        }
      );
      insertion.uploader = this.userService.user();
      insertion.agency = this.userService.agency();
      insertion.price = Number(this.insertionForm.value.price!);

      this.client.postInsertionForSale(insertion).subscribe({
        next: (response) => {
          console.log('Insertion uploaded successfully:', response);
        },
        error: (error) => {
          console.error('Error uploading insertion:', error);
        }
      });
    }
  }

}
