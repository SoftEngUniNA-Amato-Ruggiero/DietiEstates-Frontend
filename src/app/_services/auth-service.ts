import { Injectable, computed, inject, signal } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  private readonly isAuthenticatedSignal = signal(false);
  public readonly isAuthenticated = computed(() => this.isAuthenticatedSignal());

  public readonly userData$ = this.oidcSecurityService.userData$;

  private readonly configuration$ = this.oidcSecurityService.getConfiguration();

  constructor() {
    this.oidcSecurityService.checkAuth().subscribe((checkAuthResult) => {

      this.oidcSecurityService.isAuthenticated$.subscribe(
        (isAuthResult) => {
          this.isAuthenticatedSignal.set(isAuthResult.isAuthenticated);
        }
      );

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
