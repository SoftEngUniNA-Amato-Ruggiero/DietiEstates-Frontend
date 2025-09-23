import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import * as MapConstants from '../../_constants/map-component.constants';
import { FeatureCollection } from 'geojson';

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

  @Output() placeSelected = new EventEmitter<FeatureCollection>();
  @Output() userInput = new EventEmitter<string>();


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
    this.mapReady.emit(map);

    this.currentPosition$.subscribe({
      next: (pos) => {
        map.setView(pos, MapConstants.DEFAULT_ZOOM); //calls onMoveEnd automatically
        this.userLocation.emit(pos);
      },
      error: (error) => { console.error('Error getting current position:', error); }
    });
  }

  protected onMoveEnd(event: L.LeafletEvent) {
    const map = event.target;
    const center = map.getCenter();
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
    }

    this.placeSelected.emit(event);
  }
}
