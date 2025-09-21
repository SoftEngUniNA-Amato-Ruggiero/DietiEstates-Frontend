import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { backend } from '../_config/backend.config';
import { User } from '../_types/user';
import { Agency } from '../_types/agency';
import { UserWithAgency } from '../_types/user-with-agency';
import { Page } from '../_types/page';
import { Insertion } from '../_types/insertion';

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

  public getMyAgency() {
    return this.http.get<UserWithAgency>(`${this.url}/me`, this.httpOptions);
  }

  public getUserByUsername(username: string) {
    return this.http.get<User>(`${this.url}/users?username=${username}`, this.httpOptions);
  }

  public getAgencies(page = 0, pageSize = 10) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Page<Agency>>(`${this.url}/agencies`, { ...this.httpOptions, params });
  }

  public getAgentsWorkingForAgency(agencyId: number, page = 0, pageSize = 10) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Page<UserWithAgency>>(`${this.url}/agencies/${agencyId}/agents`, { ...this.httpOptions, params });
  }

  public postAgency(agency: Agency) {
    return this.http.post<UserWithAgency>(`${this.url}/agencies`, agency, this.httpOptions);
  }

  public postAgent(user: User) {
    return this.http.post<UserWithAgency>(`${this.url}/agents`, user, this.httpOptions);
  }

  public postManager(user: User) {
    return this.http.post<UserWithAgency>(`${this.url}/managers`, user, this.httpOptions);
  }

  public getInsertions(center: L.LatLng, radius: number) {
    const params = new HttpParams()
      .set('lat', center.lat.toString())
      .set('lng', center.lng.toString())
      .set('radius', radius.toString());
    return this.http.get<Insertion[]>(`${this.url}/insertions`, { ...this.httpOptions, params });
  }

  public postInsertionForSale(insertion: Insertion) {
    console.log(insertion);
    return this.http.post(`${this.url}/insertions/for-sale`, insertion, this.httpOptions);
  }

  public postInsertionForRent(insertion: Insertion) {
    console.log(insertion);
    return this.http.post(`${this.url}/insertions/for-rent`, insertion, this.httpOptions);
  }
}
