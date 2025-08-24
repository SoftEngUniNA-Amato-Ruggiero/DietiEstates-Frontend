import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  authService = inject(AuthService);

  constructor() {
    this.authService.login();
  }
}
