import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { backend } from '../_config/backend.config';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const oidcSecurityService = inject(OidcSecurityService);
  const urlsToIntercept = [backend.domain];

  if (urlsToIntercept.some(url => req.url.includes(url))) {

    oidcSecurityService.getIdToken().subscribe({
      next: (token) => {
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        });
      },
      error: (err) => {
        console.error('Error fetching token', err);
      }
    });
  }

  return next(req);
};
