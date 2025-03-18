import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleResVM } from '../model/article-res-vm';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api'; // Base API URL

  // Search articles by query
  searchArticles(query: string): Observable<ArticleResVM[]> {
    return this.http.get<ArticleResVM[]>(`${this.apiUrl}/articles/search`, {
      params: { q: query }
    });
  }

  // Advanced search with multiple parameters
  advancedSearch(params: {
    query?: string, 
    categoryId?: number, 
    authorUsername?: string, 
    startDate?: string, 
    endDate?: string
  }): Observable<ArticleResVM[]> {
    return this.http.get<ArticleResVM[]>(`${this.apiUrl}/articles/advanced-search`, { 
      params: params as any 
    });
  }
}