import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleResVM } from '../model/article-res-vm';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api'; // Base API URL

  // Get article by ID
  getArticleById(id: string): Observable<ArticleResVM> {
    return this.http.get<ArticleResVM>(`${this.apiUrl}/article/${id}`);
  }

  // Get all articles
  getAllArticles(): Observable<ArticleResVM[]> {
    return this.http.get<ArticleResVM[]>(`${this.apiUrl}/articles`);
  }

  // Get latest article by category ID
  getLatestArticleByCategoryId(categoryId: number): Observable<ArticleResVM> {
    return this.http.get<ArticleResVM>(`${this.apiUrl}/article/category/${categoryId}/latest`);
  }

  // Get articles by category ID
  getArticlesByCategoryId(categoryId: number): Observable<ArticleResVM[]> {
    return this.http.get<ArticleResVM[]>(`${this.apiUrl}/articles/category/${categoryId}`);
  }

  // Get the latest article
  getLatestArticle(): Observable<ArticleResVM> {
    return this.http.get<ArticleResVM>(`${this.apiUrl}/article/latest`);
  }
}