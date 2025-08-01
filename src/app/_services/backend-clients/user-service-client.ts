import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
    return this.http.get(this.url, this.httpOptions);
  }

  getUser(userId: string) {
    return this.http.get(`${this.url}/${userId}`, this.httpOptions);
  }
}
