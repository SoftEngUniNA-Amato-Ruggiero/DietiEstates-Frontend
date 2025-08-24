import * as L from 'leaflet';
import * as MapConstants from './map-component.constants';

export const test_coords = [
    new L.LatLng(40.839183, 14.187035), // Monte Sant'Angelo
    new L.LatLng(40.824986, 14.195256), // Piazzale Tecchio
    new L.LatLng(40.827881, 14.191022), // Via Claudio
    new L.LatLng(40.818138, 14.174171), // Via Nuova Agnano
    new L.LatLng(40.837088, 14.30361), // San Giovanni a Teduccio
]

export const test_layer = new L.LayerGroup(
    test_coords.map((coord) => {
        const m = L.marker(coord, { icon: MapConstants.MARKER_ICON });
        m.on('click', () => {
            alert(`Marker clicked at ${coord}`);
        });
        return m;
    })
);