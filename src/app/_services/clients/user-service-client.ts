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
  private readonly url = 'http://localhost:8081/api/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllUsers() {
    return this.http.get<User[]>(this.url, this.httpOptions);
  }

  getUser(userId: number) {
    return this.http.get<User>(`${this.url}/${userId}`, this.httpOptions);
  }

  postUser(user: User) {
    return this.http.post<User>(this.url, user, this.httpOptions);
  }

  getCustomers() {
    return this.http.get<User[]>(`${this.url}/customers`, this.httpOptions);
  }

  getCustomer(userId: number) {
    return this.http.get<User>(`${this.url}/customers/${userId}`, this.httpOptions);
  }

  postCustomer(user: User) {
    return this.http.post<User>(`${this.url}/customers`, user, this.httpOptions);
  }

  postAgent(user: RealEstateAgent) {
    return this.http.post<RealEstateAgent>(`${this.url}/agents`, user, this.httpOptions);
  }

  postManager(user: RealEstateAgent) {
    return this.http.post<RealEstateAgent>(`${this.url}/managers`, user, this.httpOptions);
  }

  getAgencies() {
    return this.http.get<Agency[]>(`${this.url}/agencies`, this.httpOptions);
  }

  postAgency(agency: Agency) {
    return this.http.post<Agency>(`${this.url}/agencies`, agency, this.httpOptions);
  }
}
