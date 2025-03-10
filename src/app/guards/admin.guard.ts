import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if user is authenticated and is an admin
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser) {
    const user = JSON.parse(currentUser);
    
    // Check if user has admin role
    if (user.role === 'ADMIN') {
      return true;
    }
  }
  
  // User is not an admin, redirect to home page
  router.navigate(['/']);
  return false;
};