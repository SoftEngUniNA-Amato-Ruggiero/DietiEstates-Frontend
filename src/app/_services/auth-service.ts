import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { User } from '../_model/user';
import { UserInfo } from '../_model/user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly isAuthenticated = computed(() => this.isAuthenticatedSignal());
  public readonly isManager = computed(() => this.roleSignal() === "AGENCY_MANAGER");
  public readonly user = computed(() => this.authenticatedUser());
  public readonly roleSignal = signal<string | null>(null);

  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly configuration$ = this.oidcSecurityService.getConfiguration();

  public readonly userData$ = this.oidcSecurityService.userData$;

  private readonly isAuthenticatedSignal = signal(false);
  private readonly authenticatedUser = signal<User | null>(null);


  constructor() {
    this.oidcSecurityService.checkAuth().subscribe();

    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticatedSignal.set(isAuthenticated);

        console.warn('authenticated: ', isAuthenticated);
      }
    );

    effect(() => {
      if (!this.isAuthenticated()) {
        return;
      }
      this.userData$.subscribe({
        next: (userData) => {
          this.initializeAuthenticatedUser(userData);
        }
      });
    });

    effect(() => {
      if (this.roleSignal()) {
        console.info('Role signal updated:', this.roleSignal());
      }
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

  private initializeAuthenticatedUser(userData: UserDataResult) {
    if (userData?.userData) {
      const email: string | undefined = userData.userData.email;
      const cognitoSub: string | undefined = userData.userData.sub;

      const firstName: string | undefined = userData.userData.given_name;
      const lastName: string | undefined = userData.userData.family_name;

      const groups: string[] = userData.userData['cognito:groups'] ?? [];

      if (!email || !cognitoSub || !firstName || !lastName) {
        throw new Error('Missing user data: email, cognitoSub, firstName, or lastName is undefined. But isAuthenticated is true.');
      }

      const info = new UserInfo(firstName, lastName);
      this.authenticatedUser.set(new User(email, info));

      console.info(this.user(), groups);
    }
  }
}
