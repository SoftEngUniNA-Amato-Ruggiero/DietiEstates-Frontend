import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStateService } from '../_services/user-state-service';

export const agentGuard: CanActivateFn = (route, state) => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);
  if (userStateService.isAffiliatedWithAgency()) {
    return true;
  } else {
    console.log("You are not an agent");
    return router.parseUrl("");
  }
};
