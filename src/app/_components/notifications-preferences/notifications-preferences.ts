import { Component, inject } from '@angular/core';
import { UserStateService } from '../../_services/user-state-service';

@Component({
  selector: 'app-notifications-preferences',
  imports: [],
  templateUrl: './notifications-preferences.html',
  styleUrl: './notifications-preferences.scss'
})
export class NotificationsPreferences {
  userState = inject(UserStateService);

  notificationsPreferences = this.userState.notificationsPreferences();

  toggleEmailNotifications() {
    this.userState.changeEmailNotificationsPreferences(!this.userState.notificationsPreferences()?.emailNotificationsEnabled);
  }

  toggleNotificationsForSale() {
    this.userState.changeNotificationsForSalePreferences(!this.userState.notificationsPreferences()?.notificationsForSaleEnabled);
  }

  toggleNotificationsForRent() {
    this.userState.changeNotificationsForRentPreferences(!this.userState.notificationsPreferences()?.notificationsForRentEnabled);
  }

  protected getButtonText(isEnabled: boolean | undefined | null): string {
    return isEnabled ? 'Disable' : 'Enable';
  }
}
