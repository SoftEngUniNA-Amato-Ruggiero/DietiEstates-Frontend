import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth-service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.scss'
})
export class Logout {
  authService = inject(AuthService);

  constructor() {
    this.authService.logout();
  }
}