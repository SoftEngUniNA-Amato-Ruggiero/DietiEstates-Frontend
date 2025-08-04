import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../_model/user';
import { Agency } from '../../_model/agency';
import { RealEstateAgent } from '../../_model/realEstateAgent';

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

  public getUserByEmail(email: string) {
    return this.http.get<User>(`${this.url}/users?email=${email}`, this.httpOptions);
  }

  public getUserById(userId: number) {
    return this.http.get<User>(`${this.url}/users/${userId}`, this.httpOptions);
  }

  public postSelf(user: User) {
    console.log('user: \n', user);
    return this.http.post<{ user: User, role: string }>(`${this.url}/users/self`, user, this.httpOptions);
  }

  // TODO: update and delete self (not mandatory)

  public getAgencies() {
    return this.http.get<Agency[]>(`${this.url}/agencies`, this.httpOptions);
  }

  public postAgency(agency: Agency) {
    return this.http.post<{ agency: Agency, role: string }>(`${this.url}/agencies`, agency, this.httpOptions);
  }

  public putAgency(agencyId: number, agency: Agency) {
    return this.http.put<Agency>(`${this.url}/agencies/${agencyId}`, agency, this.httpOptions);
  }

  public postAgent(agencyId: number, user: RealEstateAgent) {
    return this.http.post<RealEstateAgent>(`${this.url}/agencies/${agencyId}/agents`, user, this.httpOptions);
  }
}
