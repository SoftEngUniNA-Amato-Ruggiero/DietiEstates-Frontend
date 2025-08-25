import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { backend } from '../_config/backend.config';
import { User } from '../_types/user';
import { Agency } from '../_types/agency';
import { UserAgencyRole } from '../_types/user-agency-role';

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

  public getUserByUsername(username: string) {
    return this.http.get<User>(`${this.url}/users?username=${username}`, this.httpOptions);
  }

  public getRole() {
    return this.http.get<UserAgencyRole>(`${this.url}/users/role`, this.httpOptions);
  }

  public getAgencies() {
    return this.http.get<Agency[]>(`${this.url}/agencies`, this.httpOptions);
  }

  public postAgency(agency: Agency) {
    return this.http.post<UserAgencyRole>(`${this.url}/agencies`, agency, this.httpOptions);
  }

  public postAgent(user: User) {
    return this.http.post<User>(`${this.url}/agents`, user, this.httpOptions);
  }

  public postManager(user: User) {
    return this.http.post<User>(`${this.url}/managers`, user, this.httpOptions);
  }
}
