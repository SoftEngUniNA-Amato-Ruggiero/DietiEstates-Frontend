import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthService } from '../../_services/auth-service';

@Component({
  selector: 'app-logout',
  imports: [MatProgressSpinner],
  templateUrl: './logout.html',
  styleUrl: './logout.scss'
})
export class Logout {
  authService = inject(AuthService);

  constructor() {
    this.authService.logout();
  }
}