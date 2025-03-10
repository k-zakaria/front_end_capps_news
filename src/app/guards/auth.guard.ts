// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Vérifier la clé 'user' au lieu de 'currentUser'
  const userStr = localStorage.getItem('user');
  
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      // Vérifiez que le token existe
      if (user && user.token) {
        return true;
      }
    } catch (error) {
      console.error('Erreur de parsing JSON pour user:', error);
    }
  }
  
  // Redirection avec l'URL actuelle comme returnUrl
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
  return false;
};