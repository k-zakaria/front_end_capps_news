import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFormData, UserResVM } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api';

  getAllUsers(): Observable<UserResVM[]> {
    return this.http.get<UserResVM[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<UserResVM> {
    return this.http.get<UserResVM>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: UserFormData): Observable<UserResVM> {
    return this.http.post<UserResVM>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: UserFormData): Observable<UserResVM> {
    return this.http.put<UserResVM>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // src/app/services/user.service.ts
  updateUserRole(userId: number, role: string): Observable<UserResVM> {
    return this.http.put<UserResVM>(`${this.apiUrl}/users/${userId}/role`, { role });
  }

  
}