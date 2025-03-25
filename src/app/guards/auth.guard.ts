// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const token = localStorage.getItem('accessToken');
  
  if (token) {
    return true;
  }
  

  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
  return false;
};