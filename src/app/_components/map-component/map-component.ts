import { Component, computed, effect, signal } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import '@geoapify/leaflet-address-search-plugin';
import { Observable } from 'rxjs';
import * as MapConstants from './map-component.constants';
import { test_layer } from './test-layer';

declare module 'leaflet' {
  namespace control {
    function addressSearch(apiKey: string, options?: any): L.Control;
  }
}

@Component({
  selector: 'app-map-component',
  imports: [LeafletModule],
  templateUrl: './map-component.html',
  styleUrl: './map-component.scss'
})
export class MapComponent {

  public readonly clickedAt = computed(() => this.clickedAtSignal());

  protected map: L.Map | undefined;

  protected userMarkerLayer: Array<L.Marker> = [];

  protected readonly options = {
    layers: [
      L.tileLayer(L.Browser.retina ? MapConstants.GEOAPIFY_RETINA_URL : MapConstants.GEOAPIFY_TILE_URL, {
        maxZoom: MapConstants.MAX_ZOOM,
        attribution: MapConstants.GEOAPIFY_COPYRIGHT,
        id: MapConstants.STYLE_ID
      })
    ],
    zoom: 16,
    center: MapConstants.DEFAULT_CENTER
  };

  protected readonly addressSearchControl = L.control.addressSearch(MapConstants.GEOAPIFY_API_KEY, {
    position: 'topright',
    resultCallback: (address: any) => {
      console.log(address)
      if (address?.lat && address?.lon) {
        const latLngPosition = L.latLng(address.lat, address.lon);
        this.map?.setView(latLngPosition, 18);
        this.clickedAtSignal.set(latLngPosition);
      }
    },
    suggestionsCallback: (suggestions: any) => {
      console.log(suggestions);
    }
  });

  private readonly clickedAtSignal = signal<L.LatLng | undefined>(undefined);

  private readonly currentPositionObservable = new Observable<L.LatLng>((subscriber) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        subscriber.next(L.latLng(position.coords.latitude, position.coords.longitude));
      },
      (error) => {
        subscriber.error(error);
      }
    );
  });

  constructor() {
    effect(() => {
      const clickPos = this.clickedAt();
      if (clickPos) {
        this.userMarkerLayer = [L.marker(clickPos, { icon: MapConstants.MARKER_ICON })];
      }
    });
  }

  protected onMapReady(map: L.Map) {
    this.map = map;
    map.addControl(this.addressSearchControl);
    map.addLayer(test_layer);

    this.currentPositionObservable.subscribe({
      next: (pos) => { map.setView(pos, 16); },
      error: (error) => { console.error('Error getting current position:', error); }
    });

    map.on('click', (e: L.LeafletMouseEvent) => {
      this.clickedAtSignal.set(e.latlng);
    });
  }
}
