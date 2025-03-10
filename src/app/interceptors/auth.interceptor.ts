import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  // Récupérer l'utilisateur depuis la clé 'user'
  const userStr = localStorage.getItem('user');

  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user && user.token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
      }
    } catch (error) {
      console.error('Erreur lors du parsing du token:', error);
    }
  }

  return next(req);
};
