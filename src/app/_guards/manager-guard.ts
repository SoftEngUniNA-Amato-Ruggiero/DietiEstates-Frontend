import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserStateService } from '../_services/user-state-service';

export const managerGuard: CanActivateFn = (route, state) => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);

  return userStateService.isManager$.pipe(
    map(isManager => {
      if (isManager) {
        return true;
      } else {
        console.log("You are not a manager");
        return router.parseUrl("");
      }
    })
  );
};
