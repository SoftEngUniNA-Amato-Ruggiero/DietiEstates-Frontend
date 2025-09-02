import { Injectable, inject, computed, effect, signal } from '@angular/core';
import { Agency } from '../_types/agency';
import { ROLE } from '../_types/roles';
import { User } from '../_types/user';
import { UserDataResult } from 'angular-auth-oidc-client';
import { BackendClientService } from './backend-client-service';
import { AuthService } from './auth-service';
import { UserWithAgency } from '../_types/user-with-agency';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private readonly client = inject(BackendClientService);
  private readonly authService = inject(AuthService);

  private readonly userDataSignal = signal<UserDataResult | null>(null);
  private readonly userSignal = signal<User | null>(null);
  private readonly agencySignal = signal<Agency | null>(null);
  private readonly rolesSignal = signal<string[] | null>(null);

  public readonly uploadAgencyResponseSignal = signal<UserWithAgency | null>(null);

  public readonly user = computed(() => this.userSignal() ?? null);
  public readonly agency = computed(() => this.agencySignal() ?? null);
  public readonly roles = computed(() => this.rolesSignal() ?? null);

  public readonly givenName = computed(() => this.userDataSignal()?.userData().given_name ?? null);
  public readonly familyName = computed(() => this.userDataSignal()?.userData().family_name ?? null);

  public readonly isManager = computed(() => this.roles()?.includes(ROLE.MANAGER));
  public readonly isAgent = computed(() => this.roles()?.includes(ROLE.AGENT));
  public readonly isAffiliatedWithAgency = computed(() => this.agency() !== null);

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

    // Subscribe to get user's agency and role from backend after authentication
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.client.getMyAgency().subscribe({
          next: userWithAgency => {
            this.userSignal.set(userWithAgency.user);
            this.agencySignal.set(userWithAgency.agency);
            this.rolesSignal.set(userWithAgency.roles);
          },
          error: err => {
            // do nothing
          }
        });
      }
    });

    // Update user, agency and role signals when a new agency is uploaded succesfully by the user
    effect(() => {
      if (this.uploadAgencyResponseSignal()) {
        this.agencySignal.set(this.uploadAgencyResponseSignal()!.agency);
        this.rolesSignal.set(this.uploadAgencyResponseSignal()!.roles);
      }
    })
  }
}
