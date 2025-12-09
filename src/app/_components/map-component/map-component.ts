import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { Observable } from 'rxjs';
import { FeatureCollection } from 'geojson';
import * as L from 'leaflet';
import { GeoapifyClientService } from '../../_services/geoapify-client-service';
import { UserStateService } from '../../_services/user-state-service';
import * as MapConstants from '../../_constants/map-component.constants';
import { NotificationsPreferencesService } from '../../_services/notifications-preferences-service';

@Component({
  selector: 'app-map-component',
  imports: [LeafletModule, GeoapifyGeocoderAutocompleteModule],
  templateUrl: './map-component.html',
  styleUrl: './map-component.scss'
})
export class MapComponent implements OnChanges {
  @Input() inputLayer?: L.Layer;

  @Output() mapReady = new EventEmitter<L.Map>();
  @Output() mapCenter = new EventEmitter<L.LatLng>();
  @Output() userLocation = new EventEmitter<L.LatLng>();
  @Output() clickedAt = new EventEmitter<L.LatLng>();

  @Output() placeSelected = new EventEmitter<L.LatLng>();
  @Output() userInput = new EventEmitter<string>();

  protected readonly userState = inject(UserStateService);
  protected readonly notificationsPreferencesService = inject(NotificationsPreferencesService);
  protected readonly geoapify = inject(GeoapifyClientService);

  protected map?: L.Map;

  protected readonly tileLayer = L.tileLayer(L.Browser.retina ? MapConstants.GEOAPIFY_RETINA_URL : MapConstants.GEOAPIFY_TILE_URL, {
    maxZoom: MapConstants.MAX_ZOOM,
    attribution: MapConstants.GEOAPIFY_COPYRIGHT,
    id: MapConstants.STYLE_ID
  });

  protected readonly options = {
    layers: [this.tileLayer],
    zoom: MapConstants.DEFAULT_ZOOM,
    center: MapConstants.DEFAULT_CENTER
  };

  private readonly currentPosition$ = new Observable<L.LatLng>((subscriber) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        subscriber.next(L.latLng(position.coords.latitude, position.coords.longitude));
      },
      (error) => {
        subscriber.error(error);
      }
    );
  });

  ngOnChanges(changes: SimpleChanges) {
    console.log("detected changes:\n", changes);

    if (changes['inputLayer']?.previousValue) {
      this.map?.removeLayer(changes['inputLayer'].previousValue);
    }
    if (changes['inputLayer']?.currentValue) {
      this.map?.addLayer(changes['inputLayer'].currentValue);
    }
  }

  protected onMapReady(map: L.Map) {
    this.map = map;
    setTimeout(() => { this.map!.invalidateSize(); }, 200);

    this.mapReady.emit(this.map);

    this.currentPosition$.subscribe({
      next: (pos) => {
        this.map!.setView(pos, MapConstants.DEFAULT_ZOOM); //calls onMoveEnd automatically

        if (!this.userState.notificationsPreferences()?.city) {
          this.setCityInNotificationsPreferences(pos);
        }

        this.userLocation.emit(pos);
      },
      error: (error) => { console.error('Error getting current position:', error); }
    });
  }

  private setCityInNotificationsPreferences(pos: L.LatLng) {
    this.geoapify.reverseGeocode(pos.lat, pos.lng).subscribe({
      next: (result: FeatureCollection) => {
        this.notificationsPreferencesService.changeCityInNotificationPreferences(result.features[0].properties!['city']);
      }
    });
  }

  protected onMoveEnd(event: L.LeafletEvent) {
    this.map = this.map ?? event.target;
    const center = this.map!.getCenter();
    this.mapCenter.emit(center);
  }

  protected onClick(event: L.LeafletMouseEvent) {
    const clickPos = event.latlng;
    if (!clickPos) return;

    console.log("Map clicked at ", clickPos);
    this.clickedAt.emit(clickPos);
  }

  protected onPlaceSelected(event: any) {
    console.log("place selected: ", event);

    if (event?.geometry?.coordinates) {
      const [lon, lat] = event.geometry.coordinates;
      const position = L.latLng(lat, lon);
      this.map!.setView(position, 20);

      this.placeSelected.emit(position);
    }

  }
}
