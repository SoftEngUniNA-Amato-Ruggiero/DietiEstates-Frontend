import { Component, effect, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import * as MapConstants from '../../_constants/map-component.constants';
import { MapComponent } from "../map-component/map-component";
import { AgencyUpload } from '../agency-upload/agency-upload';
import { AuthService } from '../../_services/auth-service';
import { UserStateService } from '../../_services/user-state-service';
import { BackendClientService } from '../../_services/backend-client-service';
import { InsertionView } from "../insertion-view/insertion-view";
import { InsertionResponseDTO } from '../../_types/insertions/InsertionResponseDTO';

@Component({
  selector: 'app-homepage',
  imports: [MapComponent, AgencyUpload, InsertionView],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  readonly authService = inject(AuthService);
  readonly userStateService = inject(UserStateService);
  readonly client = inject(BackendClientService);

  protected mapCenter = signal<L.LatLng | undefined>(undefined);
  protected searchResultsLayerGroup?: L.LayerGroup;
  protected selectedInsertion = signal<InsertionResponseDTO | null>(null);

  constructor() {
    // Get insertions from backend every time the map center changes
    effect(() => {
      const center = this.mapCenter();
      if (!center) return;

      this.client.getInsertionsByLocation(center, 2).subscribe((insertions) => {
        console.log("Insertions within 2 degrees:", insertions);

        this.searchResultsLayerGroup = L.layerGroup(
          insertions.content.map((insertion) => this.initializeMarkerForInsertion(insertion))
        );
      });
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
