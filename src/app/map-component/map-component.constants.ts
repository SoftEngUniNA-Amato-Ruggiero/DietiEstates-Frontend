import { latLng, icon, Icon } from 'leaflet';

export const GEOAPIFY_API_KEY = '37ceaa481cce4145bf39550639c6f8cc';

export const STYLE_ID = 'osm-carto';
export const MAX_ZOOM = 20; //osm map tiles provided by Geoapify are available up to the 20th zoom level

export const GEOAPIFY_TILE_URL = `https://maps.geoapify.com/v1/tile/${STYLE_ID}/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`;
export const GEOAPIFY_RETINA_URL = `https://maps.geoapify.com/v1/tile/${STYLE_ID}/{z}/{x}/{y}@2x.png?apiKey=${GEOAPIFY_API_KEY}`;
export const GEOAPIFY_COPYRIGHT = 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors';

export const OPENSTREETMAP_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const OPENSTREETMAP_COPYRIGHT = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const DEFAULT_CENTER = latLng(40.828172, 14.190613); //Via Claudio, Napoli
export const MARKER_ICON = icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'assets/marker-icon.png',
    iconRetinaUrl: 'assets/marker-icon-2x.png',
    shadowUrl: 'assets/marker-shadow.png'
});
