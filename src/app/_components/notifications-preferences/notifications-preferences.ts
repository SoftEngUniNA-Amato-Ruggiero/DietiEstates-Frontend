import { Component, inject, signal } from '@angular/core';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { UserStateService } from '../../_services/user-state-service';
import { GeoapifyClientService } from '../../_services/geoapify-client-service';
import { NotificationsPreferencesService } from '../../_services/notifications-preferences-service';

@Component({
  selector: 'app-notifications-preferences',
  imports: [GeoapifyGeocoderAutocompleteModule],
  templateUrl: './notifications-preferences.html',
  styleUrl: './notifications-preferences.scss'
})
export class NotificationsPreferences {
  protected readonly userState = inject(UserStateService);
  protected readonly notificationsPreferencesService = inject(NotificationsPreferencesService);
  protected readonly geoapify = inject(GeoapifyClientService);
  protected readonly selectedCity = signal<string | null>(null);

  protected toggleEmailNotifications() {
    this.notificationsPreferencesService.changeEmailNotificationsPreferences(!(this.userState.notificationsPreferences()?.emailNotificationsEnabled));
  }

  protected toggleNotificationsForSale() {
    this.notificationsPreferencesService.changeNotificationsForSalePreferences(!(this.userState.notificationsPreferences()?.notificationsForSaleEnabled));
  }

  protected toggleNotificationsForRent() {
    this.notificationsPreferencesService.changeNotificationsForRentPreferences(!(this.userState.notificationsPreferences()?.notificationsForRentEnabled));
  }

  protected updateCityInNotifications() {
    const city = this.selectedCity();
    if (city) {
      this.notificationsPreferencesService.changeCityInNotificationPreferences(city);
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

}
