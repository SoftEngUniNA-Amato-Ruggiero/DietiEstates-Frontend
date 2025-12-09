import { inject, Injectable } from '@angular/core';
import { NotificationPreferencesDTO } from '../_types/NotificationPreferencesDTO';
import { UserStateService } from './user-state-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsPreferencesService {
  private readonly userState = inject(UserStateService);

  changeCityInNotificationPreferences(city: string) {
    let currentPrefs = new NotificationPreferencesDTO();
    currentPrefs = Object.assign(currentPrefs, this.userState.notificationsPreferences());
    if (currentPrefs && currentPrefs.city !== city) {
      currentPrefs.city = city;
      this.userState.updateNotificationsPreferences(currentPrefs);
    }
  }

  changeEmailNotificationsPreferences(isEnabled: boolean) {
    let currentPrefs = new NotificationPreferencesDTO();
    currentPrefs = Object.assign(currentPrefs, this.userState.notificationsPreferences());
    if (currentPrefs) {
      currentPrefs.emailNotificationsEnabled = isEnabled;
      this.userState.updateNotificationsPreferences(currentPrefs);
    }
  }

  changeNotificationsForSalePreferences(isEnabled: boolean) {
    let currentPrefs = new NotificationPreferencesDTO();
    currentPrefs = Object.assign(currentPrefs, this.userState.notificationsPreferences());
    if (currentPrefs && currentPrefs.notificationsForSaleEnabled !== isEnabled) {
      currentPrefs.notificationsForSaleEnabled = isEnabled;
      this.userState.updateNotificationsPreferences(currentPrefs);
    }
  }

  changeNotificationsForRentPreferences(isEnabled: boolean) {
    let currentPrefs = new NotificationPreferencesDTO();
    currentPrefs = Object.assign(currentPrefs, this.userState.notificationsPreferences());
    if (currentPrefs && currentPrefs.notificationsForRentEnabled !== isEnabled) {
      currentPrefs.notificationsForRentEnabled = isEnabled;
      this.userState.updateNotificationsPreferences(currentPrefs);
    }
  }
}
