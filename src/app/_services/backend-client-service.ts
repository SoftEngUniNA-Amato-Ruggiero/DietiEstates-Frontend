import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { backend } from '../_config/backend.config';
import { Page } from '../_types/page';
import { InsertionForSaleResponseDTO } from '../_types/insertions/InsertionForSaleResponseDTO';
import { BusinessUserResponseDTO } from "../_types/users/BusinessUserResponseDTO";
import { UserRequestDTO } from "../_types/users/UserRequestDTO";
import { UserResponseDTO } from "../_types/users/UserResponseDTO";
import { RealEstateAgencyRequestDTO } from "../_types/RealEstateAgencyRequestDTO";
import { InsertionForRentRequestDTO } from '../_types/insertions/InsertionForRentRequestDTO';
import { InsertionForSaleRequestDTO } from '../_types/insertions/InsertionForSaleRequestDTO';
import { InsertionForRentResponseDTO } from '../_types/insertions/InsertionForRentResponseDTO';
import { InsertionResponseDTO } from '../_types/insertions/InsertionResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class BackendClientService {
  private readonly http = inject(HttpClient);
  private readonly url = `${backend.domain}:${backend.port}/api`;

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getMe() {
    return this.http.get<BusinessUserResponseDTO>(`${this.url}/me`, this.httpOptions);
  }

  public getUserByUsername(username: string) {
    return this.http.get<UserResponseDTO>(`${this.url}/users?username=${username}`, this.httpOptions);
  }

  public getAgentsWorkingForAgency(agencyId: number, page = 0, pageSize = 10) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get<Page<UserResponseDTO>>(`${this.url}/agencies/${agencyId}/agents`, { ...this.httpOptions, params });
  }

  public postAgency(agency: RealEstateAgencyRequestDTO) {
    return this.http.post<BusinessUserResponseDTO>(`${this.url}/agencies`, agency, this.httpOptions);
  }

  public postAgent(user: UserRequestDTO) {
    return this.http.post<BusinessUserResponseDTO>(`${this.url}/agents`, user, this.httpOptions);
  }

  public postManager(user: UserRequestDTO) {
    return this.http.post<BusinessUserResponseDTO>(`${this.url}/managers`, user, this.httpOptions);
  }

  public searchInsertions(center: L.LatLng,
    distance: number,
    tags: string[] = [],
    minSize: number | undefined = undefined,
    minNumberOfRooms: number | undefined = undefined,
    maxFloor: number | undefined = undefined,
    hasElevator: boolean | undefined = undefined,
    page = 0,
    pageSize = 10) {
    let params = new HttpParams()
      .set('lat', center.lat.toString())
      .set('lng', center.lng.toString())
      .set('distance', distance.toString())
      .set('tags', tags.join(','))
      .set('minSize', minSize?.toString() ?? '')
      .set('minNumberOfRooms', minNumberOfRooms?.toString() ?? '')
      .set('maxFloor', maxFloor?.toString() ?? '')
      .set('hasElevator', hasElevator?.toString() ?? '')
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Page<InsertionResponseDTO>>(`${this.url}/insertions/search`, { ...this.httpOptions, params });
  }

  public searchInsertionsForSale(center: L.LatLng,
    distance: number,
    tags: string[] = [],
    minSize: number | undefined = undefined,
    minNumberOfRooms: number | undefined = undefined,
    maxFloor: number | undefined = undefined,
    hasElevator: boolean | undefined = undefined,
    maxPrice: number | undefined = undefined,
    page = 0,
    pageSize = 10) {
    let params = new HttpParams()
      .set('lat', center.lat.toString())
      .set('lng', center.lng.toString())
      .set('distance', distance.toString())
      .set('tags', tags.join(','))
      .set('minSize', minSize?.toString() ?? '')
      .set('minNumberOfRooms', minNumberOfRooms?.toString() ?? '')
      .set('maxFloor', maxFloor?.toString() ?? '')
      .set('hasElevator', hasElevator?.toString() ?? '')
      .set('maxPrice', maxPrice?.toString() ?? '')
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Page<InsertionResponseDTO>>(`${this.url}/insertions/for-sale/search`, { ...this.httpOptions, params });
  }

  public searchInsertionsForRent(center: L.LatLng,
    distance: number,
    tags: string[] = [],
    minSize: number | undefined = undefined,
    minNumberOfRooms: number | undefined = undefined,
    maxFloor: number | undefined = undefined,
    hasElevator: boolean | undefined = undefined,
    maxRent: number | undefined = undefined,
    page = 0,
    pageSize = 10) {
    let params = new HttpParams()
      .set('lat', center.lat.toString())
      .set('lng', center.lng.toString())
      .set('distance', distance.toString())
      .set('tags', tags.join(','))
      .set('minSize', minSize?.toString() ?? '')
      .set('minNumberOfRooms', minNumberOfRooms?.toString() ?? '')
      .set('maxFloor', maxFloor?.toString() ?? '')
      .set('hasElevator', hasElevator?.toString() ?? '')
      .set('maxRent', maxRent?.toString() ?? '')
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Page<InsertionResponseDTO>>(`${this.url}/insertions/for-rent/search`, { ...this.httpOptions, params });
  }

  public postInsertionForSale(insertion: InsertionForSaleRequestDTO) {
    console.log(insertion);
    return this.http.post<InsertionForSaleResponseDTO>(`${this.url}/insertions/for-sale`, insertion, this.httpOptions);
  }

  public postInsertionForRent(insertion: InsertionForRentRequestDTO) {
    console.log(insertion);
    return this.http.post<InsertionForRentResponseDTO>(`${this.url}/insertions/for-rent`, insertion, this.httpOptions);
  }
}
