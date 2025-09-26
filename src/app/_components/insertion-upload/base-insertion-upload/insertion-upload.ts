import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { FeatureCollection } from 'geojson';
import * as L from 'leaflet';
import * as MapConstants from '../../../_constants/map-component.constants';
import { MapComponent } from '../../map-component/map-component';
import { GeoapifyClientService } from '../../../_services/geoapify-client-service';
import { InsertionRequestDTO } from '../../../_types/insertions/InsertionRequestDTO';

@Component({
  selector: 'app-insertion-upload',
  imports: [
    MapComponent,
    ReactiveFormsModule,
    QuillModule,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './insertion-upload.html',
  styleUrl: './insertion-upload.scss'
})
export class InsertionUpload {
  @Output() insertionData = new EventEmitter<InsertionRequestDTO>()

  protected readonly geoapifyClient = inject(GeoapifyClientService);
  protected readonly announcer = inject(LiveAnnouncer);

  protected readonly reactiveKeywords = signal<string[]>([]);
  protected clickMarkerLayer?: L.Marker;


  protected insertionForm = new FormGroup({
    address: new FormControl<FeatureCollection | null>(null),
    description: new FormControl<string>(''),
    tags: new FormControl<string[]>([]),
    price: new FormControl<number>(0)
  });


  constructor() {
    this.insertionForm.valueChanges.subscribe(() => this.onFormChange());
  }


  protected onFormChange() {
    if (!this.insertionForm.valid) return;
    const insertion = new InsertionRequestDTO(
      this.insertionForm.value.tags || [],
      this.insertionForm.value.description || "",
      this.insertionForm.value.address!
    );
    this.insertionData.emit(insertion);
  }


  protected addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.reactiveKeywords.update(keywords => [...keywords, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }


  protected removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
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
