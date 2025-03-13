import { inject, Injectable, signal } from '@angular/core';
import { omit } from 'lodash';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthUser, UserLogin } from '../model/UserLogin';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly urlApi = 'http://localhost:8081/api';
  private router = inject(Router);


  accessToken = signal<string | null>(null);
  user = signal<AuthUser | null>(null);

  constructor() {
    this.loadUserTokenLocalStorage();
  }

  loadUserTokenLocalStorage() {
    const storedUser = localStorage.getItem('user');
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken && storedUser) {
      this.user.set(JSON.parse(storedUser));
      this.accessToken.set(storedAccessToken);
    }
  }

  // Dans votre AuthService

  login(username: string, password: string): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.urlApi}/auth/login`, { username, password }).pipe(
      tap(response => {
        console.log('Login successful, storing user:', response);

        localStorage.setItem('currentUser', JSON.stringify(response));

        const storedUser = localStorage.getItem('currentUser');
        console.log('User stored in localStorage:----------------->', storedUser);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  //register
  register(username: string, email: string, password: string): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.urlApi}/auth/register`, { username, email, password }).pipe(
      tap((res) => {
        this.setUser(res);
        this.setAccessToken(res);
      }),
      catchError((error: HttpErrorResponse) => {
        // Gérer spécifiquement l'erreur de conflit (utilisateur existant)
        if (error.status === 409) {
          return throwError(() => new Error('Un utilisateur avec ce nom ou cet email existe déjà.'));
        }
        // Gérer d'autres erreurs
        return throwError(() => new Error('Une erreur est survenue lors de l\'inscription.'));
      })
    );
  }

  setUser(res: UserLogin) {
    localStorage.setItem('user', JSON.stringify(omit(res, ['accessToken'])));
    this.user.set(omit(res, ['accessToken']));
  }
  setAccessToken(res: UserLogin) {
    localStorage.setItem('accessToken', res.accessToken);
    this.accessToken.set(res.accessToken);
  }

  getUser(): AuthUser | null {
    return this.user();
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }

  getCurrentUser(): UserLogin | null {
    const user = localStorage.getItem('currentUser');
    console.log("Getting current user from localStorage:", user);

    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  isUserLoginenticated() {
    const token = this.getAccessToken();
    console.log('Token:', token);
    return !!token;
  }


  logout() {
    this.accessToken.set(null);
    this.user.set(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
