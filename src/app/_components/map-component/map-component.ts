import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import * as MapConstants from '../../_constants/map-component.constants';
import { test_coords } from '../../_constants/test-coords';

declare module 'leaflet' {
  namespace control {
    function addressSearch(apiKey: string, options?: any): L.Control;
  }
}

@Component({
  selector: 'app-map-component',
  imports: [LeafletModule, GeoapifyGeocoderAutocompleteModule],
  templateUrl: './map-component.html',
  styleUrl: './map-component.scss'
})
export class MapComponent {
  // TODO: it might be worth creating 2 separate components for the map used to search and the one used to upload insertions

  @Input() searchResults: any[] = test_coords;
  @Output() clickedAt = new EventEmitter<L.LatLng>();

  protected map: L.Map | undefined;

  protected readonly tileLayer = L.tileLayer(L.Browser.retina ? MapConstants.GEOAPIFY_RETINA_URL : MapConstants.GEOAPIFY_TILE_URL, {
    maxZoom: MapConstants.MAX_ZOOM,
    attribution: MapConstants.GEOAPIFY_COPYRIGHT,
    id: MapConstants.STYLE_ID
  })

  protected readonly clickMarkerLayer = L.marker(MapConstants.DEFAULT_CENTER, {
    icon: MapConstants.MARKER_ICON,
    draggable: true,
    autoPan: true,
    riseOnHover: true
  });

  protected readonly searchResultsLayer = L.layerGroup(
    this.searchResults.map((coord) => {
      const marker = L.marker(coord, { icon: MapConstants.MARKER_ICON });
      marker.on('click', () => {
        alert(`Marker clicked at ${coord}`);
      });
      return marker;
    })
  );

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

  protected initializeClickMarkerLayer() {
    this.clickMarkerLayer.on('moveend', () => {
      const position = this.clickMarkerLayer.getLatLng();
      this.clickedAt.emit(position);
      console.log("Marker moved to ", position);
    });

    this.clickMarkerLayer.on('click', () => {
      console.log("Marker clicked: logging latLng ", this.clickMarkerLayer.getLatLng());
    });

    this.clickMarkerLayer.on('dblclick', () => {
      console.log("Marker double-clicked: logging GeoJSON ", this.clickMarkerLayer.toGeoJSON());
    });

    this.clickMarkerLayer.on('mouseover', () => {
      this.clickMarkerLayer.setOpacity(0.7);
    });

    this.clickMarkerLayer.on('mouseout', () => {
      this.clickMarkerLayer.setOpacity(1);
    });
  }

  protected onMapReady(map: L.Map) {
    this.map = map;

    this.initializeClickMarkerLayer();
    map.addLayer(this.clickMarkerLayer);

    map.addLayer(this.searchResultsLayer);

    this.currentPosition$.subscribe({
      next: (pos) => {
        map.setView(pos, MapConstants.DEFAULT_ZOOM);
      },
      error: (error) => { console.error('Error getting current position:', error); }
    });
  }

  protected onClick(event: L.LeafletMouseEvent) {
    const clickPos = event.latlng;
    if (clickPos) {
      console.log("Map clicked at ", clickPos);
      this.clickMarkerLayer.setLatLng(clickPos);
      this.clickedAt.emit(clickPos);
    }
  }

  protected onMoveEnd(event: L.LeafletEvent) {
    const map = event.target;
    const center = map.getCenter();
    console.log('Map centered at:', center);
    // TODO: fetch the nearest insertions
  }

  protected placeSelected(event: any) {
    console.log("place selected: ", event);
    if (event?.geometry?.coordinates) {
      const [lon, lat] = event.geometry.coordinates;
      const position = L.latLng(lat, lon);
      this.map!.setView(position, MapConstants.DEFAULT_ZOOM);
    }
  }

  protected suggestionsChanged(event: any) {
    console.log('Suggestions changed:', event);
  }
}
