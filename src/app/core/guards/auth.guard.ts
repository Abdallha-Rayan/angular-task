import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LogInService } from '../service/log-in.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LogInService);
  const router = inject(Router);
  console.log('[AuthGuard] Checking access for:', state.url);
  console.log('[AuthGuard] isLoggedIn() value is:', authService.isLoggedIn());

  if (authService.isLoggedIn()) {
    console.log('[AuthGuard] Access GRANTED');
    return true;
  } else {
    console.log('[AuthGuard] Access DENIED - Redirecting to /auth/login');
    router.navigateByUrl('/auth/login');
    return false;
  }
};
