import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth-service';
import { UserServiceClient } from './_services/clients/user-service-client';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly authService = inject(AuthService);
  private readonly userClient = inject(UserServiceClient);

  constructor() {
    effect(() => {
      const user = this.authService.user();
      if (!user) {
        return;
      }
      this.userClient.postSelf(user).subscribe({
        next: (response) => {
          console.info('User created in the database:', response);
          this.authService.roleSignal.set(response.role);
        },
        error: (err) => {
          console.warn('Post request error, see response to check if user was already in the database:', err);
        }
      });
    });
  }
}
