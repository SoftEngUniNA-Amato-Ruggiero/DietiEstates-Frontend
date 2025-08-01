import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const oidcSecurityService = inject(OidcSecurityService);
  const backendUrl = 'http://localhost';
  if (!req.url.includes(backendUrl)) {
    return next(req);
  }

  let token: string | null = null;

  oidcSecurityService.getIdToken().subscribe({
    next: (idToken) => {
      token = idToken;
    },
    error: (err) => {
      console.error('Error fetching ID token', err);
    }
  });

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  return next(req);
};
