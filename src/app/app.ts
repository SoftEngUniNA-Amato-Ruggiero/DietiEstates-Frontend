import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth-service';
import { Navbar } from './_components/navbar/navbar';
import { UserServiceClient } from './_services/clients/user-service-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly userClient = inject(UserServiceClient);

  constructor() {
    this.userClient.getRole().subscribe(roleDTO => {
      console.log('User role:', roleDTO.role);
      this.authService.roleSignal.set(roleDTO.role);
    });
  }
}
