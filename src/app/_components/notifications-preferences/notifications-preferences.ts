import { Component, inject, signal } from '@angular/core';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { UserStateService } from '../../_services/user-state-service';
import { GeoapifyClientService } from '../../_services/geoapify-client-service';
import { NotificationPreferencesDTO } from '../../_types/NotificationPreferencesDTO';

@Component({
  selector: 'app-notifications-preferences',
  imports: [GeoapifyGeocoderAutocompleteModule],
  templateUrl: './notifications-preferences.html',
  styleUrl: './notifications-preferences.scss'
})
export class NotificationsPreferences {
  protected userState = inject(UserStateService);
  protected geoapify = inject(GeoapifyClientService);
  protected selectedCity = signal<string | null>(null);

  protected toggleEmailNotifications() {
    this.changeEmailNotificationsPreferences(!(this.userState.notificationsPreferences()?.emailNotificationsEnabled));
  }

  protected toggleNotificationsForSale() {
    this.changeNotificationsForSalePreferences(!(this.userState.notificationsPreferences()?.notificationsForSaleEnabled));
  }

  protected toggleNotificationsForRent() {
    this.changeNotificationsForRentPreferences(!(this.userState.notificationsPreferences()?.notificationsForRentEnabled));
  }

  protected updateCityInNotifications() {
    const city = this.selectedCity();
    if (city) {
      this.changeCityInNotificationPreferences(city);
      this.selectedCity.set(null);
    }
  }

  protected getButtonText(isEnabled: boolean | undefined | null): string {
    return isEnabled ? 'Disable' : 'Enable';
  }

  protected onPlaceSelected(event: any) {
    console.log("place selected: ", event);

    if (event?.geometry?.coordinates) {
      const [lon, lat] = event.geometry.coordinates;
      this.geoapify.reverseGeocode(lat, lon).subscribe({
        next: (result) => {
          this.selectedCity.set(result.features[0].properties!['city']);
        },
        error: (error) => { console.error('Error during reverse geocoding:', error); }
      });
    }
  }

  protected onUserInput(event: any) {
    if (!event.target.value) {
      this.selectedCity.set(null);
    }
  }

  private changeCityInNotificationPreferences(city: string) {
    let currentPrefs = new NotificationPreferencesDTO();
    currentPrefs = Object.assign(currentPrefs, this.userState.notificationsPreferences());
    if (currentPrefs && currentPrefs.city !== city) {
      currentPrefs.city = city;
      this.userState.updateNotificationsPreferences(currentPrefs);
    }
  }

  private changeEmailNotificationsPreferences(isEnabled: boolean) {
    let currentPrefs = new NotificationPreferencesDTO();
    currentPrefs = Object.assign(currentPrefs, this.userState.notificationsPreferences());
    if (currentPrefs && currentPrefs.emailNotificationsEnabled !== isEnabled) {
      currentPrefs.emailNotificationsEnabled = isEnabled;
      this.userState.updateNotificationsPreferences(currentPrefs);
    }
  }

  private changeNotificationsForSalePreferences(isEnabled: boolean) {
    let currentPrefs = new NotificationPreferencesDTO();
    currentPrefs = Object.assign(currentPrefs, this.userState.notificationsPreferences());
    if (currentPrefs && currentPrefs.notificationsForSaleEnabled !== isEnabled) {
      currentPrefs.notificationsForSaleEnabled = isEnabled;
      this.userState.updateNotificationsPreferences(currentPrefs);
    }
  }

  private changeNotificationsForRentPreferences(isEnabled: boolean) {
    let currentPrefs = new NotificationPreferencesDTO();
    currentPrefs = Object.assign(currentPrefs, this.userState.notificationsPreferences());
    if (currentPrefs && currentPrefs.notificationsForRentEnabled !== isEnabled) {
      currentPrefs.notificationsForRentEnabled = isEnabled;
      this.userState.updateNotificationsPreferences(currentPrefs);
    }
  }

}
