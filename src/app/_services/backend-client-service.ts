import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { backend } from '../_config/backend.config';
import { User } from '../_types/user';
import { Agency } from '../_types/agency';
import { UserWithAgency } from '../_types/user-with-agency';
import { Page } from '../_types/page';

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
    return this.http.get<UserWithAgency>(`${this.url}/me/agency`, this.httpOptions);
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

  public postInsertionForSale(insertion: any) {
    return this.http.post(`${this.url}/insertions/for-sale`, insertion, this.httpOptions);
  }

  public postInsertionForRent(insertion: any) {
    return this.http.post(`${this.url}/insertions/for-rent`, insertion, this.httpOptions);
  }
}
