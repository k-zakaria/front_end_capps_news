import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
  const router = inject(Router);
  
  // Récupérer l'utilisateur depuis la clé 'user'
  const userStr = localStorage.getItem('accessToken');

  if (token) {
    try {
      // Add token to Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return next(authReq);
    } catch (error) {
      console.error('Error in auth interceptor:', error);
    }
  }

  return next(req);
};
