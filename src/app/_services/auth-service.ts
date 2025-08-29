import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BackendClientService } from './backend-client-service';
import { UserStateService } from './user-state-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly client = inject(BackendClientService);
  private readonly userStateService = inject(UserStateService);

  private readonly isAuthenticatedSignal = signal(false);
  public readonly isAuthenticated = computed(() => this.isAuthenticatedSignal());

  public readonly userData$ = this.oidcSecurityService.userData$;

  private readonly configuration$ = this.oidcSecurityService.getConfiguration();

  constructor() {
    this.oidcSecurityService.checkAuth().subscribe();

    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticatedSignal.set(isAuthenticated);
      }
    );

    // Subscribe to get user data (given name, family name etc.) from OIDC after authentication
    effect(() => {
      if (!this.isAuthenticated()) {
        return;
      }
      this.userData$.subscribe({
        next: (userData) => {
          this.userStateService.userDataSignal.set(userData);
        }
      });
    });

    // Subscribe to get user (and role) from backend after authentication
    effect(() => {
      if (!this.isAuthenticated()) {
        return;
      }
      this.client.getMyRole().subscribe({
        next: (response) => {
          this.userStateService.userSignal.set(response);
        },
        error: (error) => {
          console.error('Error fetching user role:', error);
        }
      });
    });
  }

  public login(): void {
    this.oidcSecurityService.authorize();
  }

  public logout(): void {
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }

    window.location.href = "https://eu-west-3tkwuxva4t.auth.eu-west-3.amazoncognito.com/logout?client_id=5qdd485015k9doea0l14jcv5k0&logout_uri=http://localhost:4200";
  }
}
