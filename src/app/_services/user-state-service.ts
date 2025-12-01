import { Injectable, inject, computed, effect, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataResult } from 'angular-auth-oidc-client';
import { BackendClientService } from './backend-client-service';
import { AuthService } from './auth-service';
import { ROLE } from '../_types/roles';
import { RealEstateAgencyResponseDTO } from "../_types/RealEstateAgencyResponseDTO";
import { BusinessUserResponseDTO } from "../_types/users/BusinessUserResponseDTO";
import { UserResponseDTO } from "../_types/users/UserResponseDTO";
import { NotificationPreferencesDTO } from '../_types/NotificationPreferencesDTO';
import { MeResponseDTO } from '../_types/users/MeResponseDTO';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private readonly client = inject(BackendClientService);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  private readonly userDataSignal = signal<UserDataResult | null>(null);
  private readonly userSignal = signal<UserResponseDTO | null>(null);
  private readonly agencySignal = signal<RealEstateAgencyResponseDTO | null>(null);
  private readonly rolesSignal = signal<string[] | null>(null);
  private readonly notificationsPreferenceSignal = signal<NotificationPreferencesDTO | null>(null);

  public readonly uploadAgencyResponseSignal = signal<BusinessUserResponseDTO | null>(null);

  public readonly user = computed(() => this.userSignal() ?? null);
  public readonly agency = computed(() => this.agencySignal() ?? null);
  public readonly roles = computed(() => this.rolesSignal() ?? null);
  public readonly notificationsPreferences = computed(() => this.notificationsPreferenceSignal() ?? null);

  public readonly givenName = computed(() => this.userDataSignal()?.userData?.given_name ?? null);
  public readonly familyName = computed(() => this.userDataSignal()?.userData?.family_name ?? null);

  public readonly isManager = computed(() => this.roles()?.includes(ROLE.MANAGER));
  public readonly isAgent = computed(() => this.roles()?.includes(ROLE.AGENT));
  public readonly isAffiliatedWithAgency = computed(() => this.agency() !== null);

  public isManager$ = new Observable<boolean>(subscriber => {
    if (this.isManager() !== null && this.isManager() !== undefined) {
      subscriber.next(this.isManager()!)
    } else {
      this.client.getMe().subscribe({
        next: userWithAgency => {
          subscriber.next(userWithAgency.roles?.map(r => r.name).includes(ROLE.MANAGER) ?? false);
        }
      });
    }
  });

  public isAgent$ = new Observable<boolean>(subscriber => {
    if (this.isAgent() !== null && this.isAgent() !== undefined) {
      subscriber.next(this.isAgent()!)
    } else {
      this.client.getMe().subscribe({
        next: userWithAgency => {
          subscriber.next(userWithAgency.roles?.map(r => r.name).includes(ROLE.AGENT) ?? false);
        }
      });
    }
  });

  constructor() {
    // Subscribe to get user data (given name, family name etc.) from OIDC after authentication
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.authService.userData$.subscribe(
          userData => {
            this.userDataSignal.set(userData);
          }
        );
      }
    });

    // Subscribe to get user's agency, role and notification preferences from backend after authentication
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.client.getMe().subscribe({
          next: me => {
            this.initializeUserState(me);
            console.log(me);
          },
          error: err => {
            this.client.postMe().subscribe({
              next: me => {
                this.initializeUserState(me);
                console.log(me);
              }
            });
          }
        });
      }
    });

    // Update user, agency and role signals when a new agency is uploaded succesfully by the user
    effect(() => {
      if (this.uploadAgencyResponseSignal()) {
        this.agencySignal.set(this.uploadAgencyResponseSignal()!.agency);
        this.rolesSignal.set(this.uploadAgencyResponseSignal()!.roles?.map(r => r.name) ?? []);
      }
    })
  }

  tempCityInNotificationPreferences(city: string) {
    let currentPrefs = this.notificationsPreferenceSignal();
    if (currentPrefs) {
      currentPrefs.city = city;
      this.notificationsPreferenceSignal.set(currentPrefs);
    }
  }

  changeCityInNotificationPreferences(city: string) {
    let currentPrefs = this.notificationsPreferenceSignal();
    if (currentPrefs) {
      currentPrefs.city = city;
      this.updateNotificationsPreferences(currentPrefs);
    }
  }

  changeEmailNotificationsPreferences(enabled: boolean) {
    let currentPrefs = this.notificationsPreferenceSignal();
    if (currentPrefs) {
      currentPrefs.emailNotificationsEnabled = enabled;
      this.updateNotificationsPreferences(currentPrefs);
    }
  }

  changeNotificationsForSalePreferences(enabled: boolean) {
    let currentPrefs = this.notificationsPreferenceSignal();
    if (currentPrefs) {
      currentPrefs.notificationsForSaleEnabled = enabled;
      this.updateNotificationsPreferences(currentPrefs);
    }
  }

  changeNotificationsForRentPreferences(enabled: boolean) {
    let currentPrefs = this.notificationsPreferenceSignal();
    if (currentPrefs) {
      currentPrefs.notificationsForRentEnabled = enabled;
      this.updateNotificationsPreferences(currentPrefs);
    }
  }

  private updateNotificationsPreferences(updatedPrefs: NotificationPreferencesDTO) {
    this.client.putNotificationsPreferences(updatedPrefs).subscribe({
      next: updatedPrefs => {
        this.notificationsPreferenceSignal.set(updatedPrefs);
        console.log('Notification preferences updated:', updatedPrefs);
      },
      error: err => {
        this.toastr.error('Error updating notification preferences:', err);
      }
    });
  }

  private initializeUserState(me: MeResponseDTO) {
    this.userSignal.set(me);
    this.agencySignal.set(me.agency ?? null);
    this.rolesSignal.set(me.roles?.map(r => r.name) ?? []);
    this.notificationsPreferenceSignal.set(me.notificationsPreferences ?? null);
  }
}
