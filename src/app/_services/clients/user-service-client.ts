import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../_dto/user';
import { Agency } from '../../_dto/agency';

@Injectable({
  providedIn: 'root'
})
export class UserServiceClient {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:8081/api';

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getUserByUsername(username: string) {
    return this.http.get<User>(`${this.url}/users?username=${username}`, this.httpOptions);
  }

  public getUserById(userId: number) {
    return this.http.get<User>(`${this.url}/users/${userId}`, this.httpOptions);
  }

  public getRole() {
    return this.http.get<{ role: string }>(`${this.url}/users/role`, this.httpOptions);
  }

  public getAgencies() {
    return this.http.get<Agency[]>(`${this.url}/agencies`, this.httpOptions);
  }

  public getAgencyById(agencyId: number) {
    return this.http.get<Agency>(`${this.url}/agencies/${agencyId}`, this.httpOptions);
  }

  public postAgency(agency: Agency) {
    return this.http.post<{ agency: Agency, manager: User }>(`${this.url}/agencies`, agency, this.httpOptions);
  }

  public postAgent(user: User) {
    return this.http.post<User>(`${this.url}/agents`, user, this.httpOptions);
  }
}
