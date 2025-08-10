import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth-service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    console.log("user is authenticated, allowing access");
    return true;
  } else {
    console.log("user is not authenticated, redirecting to login");
    return router.parseUrl("/login");
  }
};
