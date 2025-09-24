import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { FeatureCollection } from 'geojson';
import * as L from 'leaflet';
import * as MapConstants from '../../_constants/map-component.constants';
import { MapComponent } from '../map-component/map-component';
import { BackendClientService } from '../../_services/backend-client-service';
import { GeoapifyClientService } from '../../_services/geoapify-client-service';
import { Insertion } from '../../_types/insertions/insertion';
import { UserStateService } from '../../_services/user-state-service';
import { ToastrService } from 'ngx-toastr';
import { InsertionDetails } from '../../_types/insertions/insertion-details';

@Component({
  selector: 'app-insertion-upload',
  imports: [MapComponent, ReactiveFormsModule, QuillModule, JsonPipe],
  templateUrl: './insertion-upload.html',
  styleUrl: './insertion-upload.scss'
})
export class InsertionUpload {

  protected readonly client = inject(BackendClientService);
  protected readonly geoapifyClient = inject(GeoapifyClientService);
  protected readonly userService = inject(UserStateService);
  protected readonly toastr = inject(ToastrService);

  protected clickMarkerLayer?: L.Marker;

  protected insertionForm = new FormGroup({

    address: new FormControl<FeatureCollection | null>(null),
    description: new FormControl<string>(''),
    price: new FormControl<number>(0)

  });


  protected onSubmit() {

    if (!this.insertionForm.valid) return;

    const address = this.insertionForm.value.address;
    const details = new InsertionDetails([], this.insertionForm.value.description);
    const insertion = new Insertion(
      address!,
      details,
      40000.0,
      null
    );

    console.log("Submitting insertion:\n", insertion);

    this.client.postInsertionForSale(insertion).subscribe({
      next: (response) => {
        console.log('Insertion uploaded successfully:', response);
        this.toastr.success('Insertion uploaded successfully', 'Success');
      },
      error: (error) => {
        console.error('Error uploading insertion:', error);
        this.toastr.error('Error uploading insertion', 'Error');
      }
    });

  }


  protected onMapClicked($event: L.LatLng) {

    if (!this.clickMarkerLayer) {
      this.initializeClickMarkerLayer($event);
    } else {
      this.clickMarkerLayer.setLatLng($event);
    }

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


  private initializeClickMarkerLayer(clickPos: L.LatLng) {

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

}
