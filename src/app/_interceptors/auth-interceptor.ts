import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const oidcSecurityService = inject(OidcSecurityService);
  const backendUrlList = ['http://localhost'];

  if (backendUrlList.some(url => req.url.includes(url))) {
    let token: string | null = null;

    oidcSecurityService.getAccessToken().subscribe({
      next: (accessToken) => {
        token = accessToken;
      },
      error: (err) => {
        console.error('Error fetching Access token', err);
      }
    });

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
  }

  return next(req);
};
