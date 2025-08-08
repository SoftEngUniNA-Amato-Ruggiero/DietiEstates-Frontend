import { Component, computed, effect, signal } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer, icon, Icon, LatLng, Marker, marker } from 'leaflet';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map-component',
  imports: [LeafletModule],
  templateUrl: './map-component.html',
  styleUrl: './map-component.scss'
})
export class MapComponent {

  public readonly clickedAt = computed(() => this.clickedAtSignal());

  protected userMarkerLayer: Array<Marker> = [];

  protected readonly options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
    ],
    zoom: 16,
    center: latLng(40.828172, 14.190613)
  };

  private readonly icon = icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'assets/marker-icon.png',
    iconRetinaUrl: 'assets/marker-icon-2x.png',
    shadowUrl: 'assets/marker-shadow.png'
  });

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

  private readonly clickedAtSignal = signal<LatLng | undefined>(undefined);

  constructor() {
    effect(() => {
      const clickPos = this.clickedAt();
      if (clickPos) {
        this.userMarkerLayer = [marker(clickPos, { icon: this.icon })];
      }
    });
  }

  onMapReady(map: L.Map) {
    this.currentPositionObservable.subscribe({
      next: (pos) => { map.setView(pos, 16); },
      error: (error) => { console.error('Error getting current position:', error); }
    });

    map.on('click', (e: L.LeafletMouseEvent) => {
      this.clickedAtSignal.set(e.latlng);
    });
  }
}
