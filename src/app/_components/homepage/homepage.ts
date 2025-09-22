import { Component, effect, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import * as MapConstants from '../../_constants/map-component.constants';
import { MapComponent } from "../map-component/map-component";
import { AgencyUpload } from '../agency-upload/agency-upload';
import { AuthService } from '../../_services/auth-service';
import { UserStateService } from '../../_services/user-state-service';
import { BackendClientService } from '../../_services/backend-client-service';
import { Insertion } from '../../_types/insertions/insertion';
import { test_coords } from '../../_constants/test-coords';

@Component({
  selector: 'app-homepage',
  imports: [MapComponent, AgencyUpload],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  readonly authService = inject(AuthService);
  readonly userStateService = inject(UserStateService);
  readonly client = inject(BackendClientService);

  protected mapCenter = signal<L.LatLng | undefined>(undefined);
  protected searchResultsLayerGroup?: L.LayerGroup;

  constructor() {
    // Get insertions from backend every time the map center changes
    effect(() => {
      const center = this.mapCenter();
      if (!center) return;

      // using test coordinates to create layer for now
      this.searchResultsLayerGroup = L.layerGroup(
        test_coords.map((coord) => L.marker(coord, { icon: MapConstants.MARKER_ICON }))
      );

      // this.client.getInsertions(center, 100).subscribe((insertions) => {
      //   console.log("Insertions within 100 km:", insertions);

      //   this.searchResultsLayerGroup = L.layerGroup(
      //     insertions.map((insertion) => this.initializeMarkerForInsertion(insertion))
      //   );
      // });
    });
  }

  // private initializeMarkerForInsertion(insertion: Insertion) {
  //   const marker = L.marker(insertion.address.location, { icon: MapConstants.MARKER_ICON });
  //   marker.on('click', () => {
  //     alert(`Marker clicked at ${insertion.address.location}`);
  //   });
  //   return marker;
  // }
}
