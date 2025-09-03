import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as MapConstants from '../_constants/map-component.constants';
import { FeatureCollection } from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class GeoapifyClientService {
  private readonly baseUrl = `https://api.geoapify.com/v1/geocode`;
  private readonly http = inject(HttpClient);

  public reverseGeocode(lat: number, lon: number): Observable<FeatureCollection> {
    const url = `${this.baseUrl}/reverse?lat=${lat}&lon=${lon}&apiKey=${MapConstants.GEOAPIFY_API_KEY}`;
    return this.http.get<FeatureCollection>(url);
  }
}
