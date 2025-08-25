import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStateService } from '../_services/user-state-service';

export const managerGuard: CanActivateFn = (route, state) => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);
  if (userStateService.isManager()) {
    return true;
  } else {
    console.log("You are not a manager");
    return router.parseUrl("");
  }
};
