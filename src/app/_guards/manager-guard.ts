import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth-service';


export const managerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isManager()) {
    return true;
  } else {
    console.log("You are not a manager");
    return router.parseUrl("");
  }
};
