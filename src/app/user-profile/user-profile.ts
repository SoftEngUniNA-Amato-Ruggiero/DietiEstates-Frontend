import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthService } from '../_services/auth-service';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile {
  protected readonly authService = inject(AuthService);
}
