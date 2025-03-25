import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
    const authService = inject(AuthService);
    
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    
    const currentUser = authService.getCurrentUser();
    
    if (currentUser && currentUser.role === 'AUTHOR') {
      return true;
    }
    
    router.navigate(['/']);
    return false;
};
