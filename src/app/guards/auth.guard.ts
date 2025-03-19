// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check for the access token directly
  const token = localStorage.getItem('accessToken');
  
  if (token) {
    // Token exists, user is authenticated
    console.log('Auth guard: Access token exists, allowing navigation');
    return true;
  }
  
  // Log for debugging
  console.log('Auth guard: No access token found, redirecting to login');
  
  // Redirect with the current URL as returnUrl
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
  return false;
};