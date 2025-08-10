import { Component, computed, effect, signal } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer, LatLng, Marker, marker, Browser, control } from 'leaflet';
import { Observable } from 'rxjs';
import '@geoapify/leaflet-address-search-plugin';
import * as MapConstants from './map-component.constants';

@Component({
  selector: 'app-map-component',
  imports: [LeafletModule],
  templateUrl: './map-component.html',
  styleUrl: './map-component.scss'
})
export class MapComponent {

  public readonly clickedAt = computed(() => this.clickedAtSignal());

  protected map: L.Map | undefined;

  protected userMarkerLayer: Array<Marker> = [];

  protected readonly options = {
    layers: [
      tileLayer(Browser.retina ? MapConstants.GEOAPIFY_RETINA_URL : MapConstants.GEOAPIFY_TILE_URL, {
        maxZoom: MapConstants.MAX_ZOOM,
        attribution: MapConstants.GEOAPIFY_COPYRIGHT,
        id: MapConstants.STYLE_ID
      })
    ],
    zoom: 16,
    center: MapConstants.DEFAULT_CENTER
  };

  protected readonly addressSearchControl = (control as any).addressSearch(MapConstants.GEOAPIFY_API_KEY, {
    position: 'topleft',
    resultCallback: (address: any) => {
      console.log(address)
      if (address?.lat && address?.lon) {
        const latLngPosition = latLng(address.lat, address.lon);
        this.map?.setView(latLngPosition, 20);
        this.clickedAtSignal.set(latLngPosition);
      }
    },
    suggestionsCallback: (suggestions: any) => {
      console.log(suggestions);
    }
  });

  private readonly clickedAtSignal = signal<LatLng | undefined>(undefined);

  private readonly currentPositionObservable = new Observable<LatLng>((subscriber) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        subscriber.next(latLng(position.coords.latitude, position.coords.longitude));
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
        this.userMarkerLayer = [marker(clickPos, { icon: MapConstants.MARKER_ICON })];
      }
    });
  }

  protected onMapReady(map: L.Map) {
    this.map = map;

    this.currentPositionObservable.subscribe({
      next: (pos) => { map.setView(pos, 16); },
      error: (error) => { console.error('Error getting current position:', error); }
    });

    map.addControl(this.addressSearchControl);

    map.on('click', (e: L.LeafletMouseEvent) => {
      this.clickedAtSignal.set(e.latlng);
    });
  }
}
