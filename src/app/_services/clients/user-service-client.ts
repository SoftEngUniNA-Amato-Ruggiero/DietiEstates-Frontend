import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../_model/user';

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
}
