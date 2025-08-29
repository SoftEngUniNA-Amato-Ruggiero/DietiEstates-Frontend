import { Injectable, inject, computed, effect, signal } from '@angular/core';
import { Agency } from '../_types/agency';
import { ROLE } from '../_types/roles';
import { User } from '../_types/user';
import { UserDataResult } from 'angular-auth-oidc-client';
import { BackendClientService } from './backend-client-service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private readonly client = inject(BackendClientService);

  public readonly userSignal = signal<User | null>(null);
  public readonly userDataSignal = signal<UserDataResult | null>(null);
  public readonly agencySignal = signal<Agency | null>(null);

  public readonly user = computed(() => this.userSignal() ?? null);
  public readonly agency = computed(() => this.agencySignal() ?? null);
  public readonly role = computed(() => this.userSignal()?.role ?? null);

  public readonly givenName = computed(() => this.userDataSignal()?.userData().given_name ?? null);
  public readonly familyName = computed(() => this.userDataSignal()?.userData().family_name ?? null);

  public readonly isManager = computed(() => this.role() === ROLE.MANAGER);
  public readonly isAgent = computed(() => this.role() === ROLE.MANAGER || this.role() === ROLE.AGENT);

  constructor() {
    // Subscribe to get user's agency from backend after the role is fetched, if the user is affiliated to one
    effect(() => {
      if (this.isAgent() && !this.agency()) {
        this.client.getMyAgency().subscribe({
          next: (agency) => {
            this.agencySignal.set(agency);
          },
          error: (error) => {
            console.error('Could not fetch agency:', error);
          }
        });
      }
    });
  }
}
