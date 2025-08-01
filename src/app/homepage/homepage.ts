import { Component, effect, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthService } from '../_services/auth-service';
import { MapComponent } from "../map-component/map-component";
import { UserServiceClient } from '../_services/clients/user-service-client';
import { User } from '../_model/user';
import { Credentials } from '../_model/credentials';
import { UserInfo } from '../_model/user-info';
import { TestButtons } from '../test-buttons/test-buttons';

@Component({
  selector: 'app-homepage',
  imports: [AsyncPipe, JsonPipe, MapComponent, TestButtons],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  protected readonly authService = inject(AuthService);
  private readonly userClient = inject(UserServiceClient);

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.authService.userData$.subscribe({
          next: (userData) => {
            const email = userData.userData.email;
            const cognitoSub = userData.userData.sub;

            const firstName = userData.userData.given_name;
            const lastName = userData.userData.family_name;

            const groups = userData.userData['cognito:groups'] || [];

            const credentials = new Credentials(email, cognitoSub);
            const info = new UserInfo(firstName, lastName);

            const user = new User(credentials, info);

            console.info(user, groups);
            this.userClient.postCustomer(user).subscribe({
              next: (response) => {
                console.info('User created in the database:', response);
              },
              error: (err) => {
                console.info('User exists in the database:', err);
              }
            });
          },
          error: (err) => {
            console.error('Error fetching user data', err);
          }
        });
      }
    });
  }
}
