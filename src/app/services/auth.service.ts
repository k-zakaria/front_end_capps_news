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
    const storedUser = localStorage.getItem('user');
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken && storedUser) {
      this.user.set(JSON.parse(storedUser));
      this.accessToken.set(storedAccessToken);
    }
  }

  login(username: string, password: string): Observable<UserLogin> {
    return this.http.post<UserLogin>(this.urlApi, { username, password }).pipe(
      tap((res) => {
        this.setUser(res);
        this.setAccessToken(res);
      }),
    );
  }

  //register
  register(username: string, email: string, password: string): Observable<UserLogin> {
    return this.http.post<UserLogin>(this.registerUrl, { username, email, password }).pipe(
      tap((res) => {
        this.setUser(res);
        this.setAccessToken(res);
      }),
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
    return user ? JSON.parse(user) : null;
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
