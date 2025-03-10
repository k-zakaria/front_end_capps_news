import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResVM } from '../model/category-res-vm';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api';

  getAllCategories(): Observable<CategoryResVM[]> {
    return this.http.get<CategoryResVM[]>(`${this.apiUrl}/categories`);
  }

  createCategory(category: Omit<CategoryResVM, 'id'>): Observable<CategoryResVM> {
    return this.http.post<CategoryResVM>(`${this.apiUrl}/category`, category);
  }
  
  updateCategory(id: number, category: Omit<CategoryResVM, 'id'>): Observable<CategoryResVM> {
    return this.http.put<CategoryResVM>(`${this.apiUrl}/category/${id}`, category);
  }
  
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/category/${id}`);
  }

}
