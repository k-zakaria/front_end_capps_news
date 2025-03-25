import { inject, Injectable, signal } from '@angular/core';
import { omit } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthUser, UserLogin } from '../model/UserLogin';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly urlApi = 'http://localhost:8081/api/auth/login';
  private readonly registerUrl = 'http://localhost:8081/api/auth/register';
  private router = inject(Router);

  accessToken = signal<string | null>(null);
  user = signal<AuthUser | null>(null);

  constructor() {
    this.loadUserTokenLocalStorage();
  }

  loadUserTokenLocalStorage() {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      this.accessToken.set(storedAccessToken);
      const decodedUser = this.decodeToken(storedAccessToken);
      this.user.set(decodedUser);
    }
  }

  private decodeToken(token: string | null): AuthUser | null {
    if (!token) {
      console.error('Token is null or undefined');
      return null;
    }
  
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Invalid JWT format: expected 3 parts but got', parts.length);
        return null;
      }
      
      const base64Url = parts[1];
      
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      let payload;
      try {
        payload = JSON.parse(window.atob(base64));
      } catch (e) {
        console.error('Error parsing token payload:', e);
        return null;
      }
      
      if (!payload) {
        console.error('Token payload is empty');
        return null;
      }
      
            return {
        id: payload.id || 0,
        username: payload.username || payload.sub || '',
        role: payload.role || '',
        permission: Array.isArray(payload.permissions) 
          ? payload.permissions.map((p: any) => p.authority)
          : []
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getCurrentUser(): AuthUser | null {
    return this.user();
  }

  getUserFromToken(): AuthUser | null {
    const token = this.getAccessToken();
    return token ? this.decodeToken(token) : null;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.urlApi, { username, password }).pipe(
      tap((res) => {
        
        if (!res || !res.token) {
          return;
        }
          this.setToken(res);
        
        const decodedUser = this.decodeToken(res.token);
        
        if (decodedUser) {
          this.user.set(decodedUser);
          const userInfo = {
            username: decodedUser.username,
            role: decodedUser.role,
            id: decodedUser.id
          };
          localStorage.setItem('user', JSON.stringify(userInfo));
        } else {
          console.error('Failed to decode user from token');
        }
      }),
    );
  }

  // Updated to match backend response structure
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { username, email, password }).pipe(
      tap((res) => {
        if (!res || !res.token) {
          console.error('Register response missing token', res);
          return;
        }
        
        this.setToken(res);
        
        const decodedUser = this.decodeToken(res.token);
        
        if (decodedUser) {
          this.user.set(decodedUser);
          const userInfo = {
            username: decodedUser.username,
            role: decodedUser.role,
            id: decodedUser.id
          };
          localStorage.setItem('user', JSON.stringify(userInfo));
        }
      }),
    );
  }

  // New method to handle the token field from the backend
  setToken(res: { token: string, refreshToken?: string }) {
    localStorage.setItem('accessToken', res.token);
    this.accessToken.set(res.token);
    
    // Also store refresh token if available
    if (res.refreshToken) {
      localStorage.setItem('refreshToken', res.refreshToken);
    }
  }

  getUser(): AuthUser | null {
    return this.user();
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }

  isUserLoginenticated() {
    const token = this.getAccessToken();
    return !!token;
  }

  logout() {
    this.accessToken.set(null);
    this.user.set(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}