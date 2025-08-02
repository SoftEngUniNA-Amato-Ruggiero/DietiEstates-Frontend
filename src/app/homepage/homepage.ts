import { Component, effect, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthService } from '../_services/auth-service';
import { UserServiceClient } from '../_services/clients/user-service-client';
import { MapComponent } from "../map-component/map-component";
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
      const user = this.authService.user();
      if (!user) {
        return;
      }
      this.userClient.postCustomer(user).subscribe({
        next: (response) => {
          console.info('User created in the database:', response);
        },
        error: (err) => {
          console.info('User exists in the database:', err);
        }
      });
    });
  }
}
