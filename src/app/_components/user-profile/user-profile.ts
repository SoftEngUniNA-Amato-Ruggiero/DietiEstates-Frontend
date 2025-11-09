import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth-service';
import { UserStateService } from '../../_services/user-state-service';
import { NotificationsPreferences } from "../notifications-preferences/notifications-preferences";

@Component({
  selector: 'app-user-profile',
  imports: [NotificationsPreferences],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile {
  protected readonly authService = inject(AuthService);
  protected readonly userStateService = inject(UserStateService);
}
