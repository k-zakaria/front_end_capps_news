import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleReqVM, ArticleResVM } from '../model/article-res-vm';
import { CategoryResVM } from '../model/category-res-vm';
import { TagResVM } from '../model/tag-res-vm';

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

  // Méthode pour récupérer tous les tags
  getAllTags(): Observable<TagResVM[]> {
    return this.http.get<TagResVM[]>(`${this.apiUrl}/tags`);
  }

  // Méthode pour récupérer toutes les catégories
  getAllCategories(): Observable<CategoryResVM[]> {
    return this.http.get<CategoryResVM[]>(`${this.apiUrl}/categories`);
  }

  // Méthode pour créer un article (déjà implémentée)
  createArticle(article: ArticleReqVM, image: File): Observable<ArticleResVM> {
    const formData = new FormData();
    formData.append('article', JSON.stringify(article));
    formData.append('image', image);

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post<ArticleResVM>(`${this.apiUrl}/article`, formData, { headers });
  }
}