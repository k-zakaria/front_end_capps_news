import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagResVM } from '../model/tag-res-vm';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api';
  
  getAllTags(): Observable<TagResVM[]> {
    return this.http.get<TagResVM[]>(`${this.apiUrl}/tags`);
  }
  
  getTagById(id: number): Observable<TagResVM> {
    return this.http.get<TagResVM>(`${this.apiUrl}/tags/${id}`);
  }
  
  createTag(tag: Omit<TagResVM, 'id'>): Observable<TagResVM> {
    return this.http.post<TagResVM>(`${this.apiUrl}/tags`, tag);
  }
  
  updateTag(id: number, tag: Omit<TagResVM, 'id'>): Observable<TagResVM> {
    return this.http.put<TagResVM>(`${this.apiUrl}/tags/${id}`, tag);
  }
  
  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tags/${id}`);
  }
}