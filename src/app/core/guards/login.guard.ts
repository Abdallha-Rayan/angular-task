import { CanActivateFn, Router } from '@angular/router';
import { LogInService } from '../service/log-in.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(LogInService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log('[LoginGuard] User already logged in. Redirecting to /system');
    router.navigateByUrl('/system');
    return false;
  }

  return true;
};
