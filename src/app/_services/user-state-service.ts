import { Injectable, computed, signal } from '@angular/core';
import { ROLE } from '../_types/roles';
import { UserAgencyRole } from '../_types/user-agency-role';
import { UserDataResult } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  public readonly userAgencyAndRoleSignal = signal<UserAgencyRole | null>(null);
  public readonly userDataSignal = signal<UserDataResult | null>(null);

  public readonly user = computed(() => this.userAgencyAndRoleSignal()?.user ?? null);
  public readonly agency = computed(() => this.userAgencyAndRoleSignal()?.agency ?? null);
  public readonly role = computed(() => this.userAgencyAndRoleSignal()?.role ?? null);

  public readonly givenName = computed(() => this.userDataSignal()?.userData().given_name ?? null);
  public readonly familyName = computed(() => this.userDataSignal()?.userData().family_name ?? null);

  public readonly isManager = computed(() => this.role() === ROLE.MANAGER);
  public readonly isAgent = computed(() => this.role() === ROLE.MANAGER || this.role() === ROLE.AGENT);
}
