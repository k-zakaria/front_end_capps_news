import { Injectable, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ArticleReqVM, ArticleResVM } from '../model/article-res-vm';

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

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
  
  createArticle(articleData: ArticleReqVM, image: File | null): Observable<ArticleResVM> {
    const formData = new FormData();
    
    formData.append('article', JSON.stringify(articleData));
    
    if (image) {
      formData.append('image', image);
    }
    
    return this.http.post<ArticleResVM>(`${this.apiUrl}/article`, formData);
  }
  
  updateArticle(id: string, articleData: ArticleReqVM, image: File | null): Observable<ArticleResVM> {
    const formData = new FormData();
    
    formData.append('article', JSON.stringify(articleData));
    
    if (image) {
      formData.append('image', image);
    }
    
    return this.http.put<ArticleResVM>(`${this.apiUrl}/article/${id}`, formData);
  }
  
  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/article/${id}`);
  }
  
  publishArticle(id: string): Observable<ArticleResVM> {
    return this.http.put<ArticleResVM>(`${this.apiUrl}/article/${id}/publish`, {});
  }
  
  unpublishArticle(id: string): Observable<ArticleResVM> {
    return this.http.put<ArticleResVM>(`${this.apiUrl}/article/${id}/unpublish`, {});
  }
  
  uploadImage(file: File): Observable<{imageUrl: string}> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<{imageUrl: string}>(`${this.apiUrl}/upload`, formData);
  }

  getArticlesByAuthor(username: string): Observable<ArticleResVM[]> {
    return this.http.get<ArticleResVM[]>(`${this.apiUrl}/author/${username}`).pipe(
      catchError(error => {
        console.error('API error:', error);
        return throwError(() => error);
      })
    );
  }

  getPaginatedArticles(page: number = 0, size: number = 8): Observable<PaginatedResponse<ArticleResVM>> {
    return this.http.get<PaginatedResponse<ArticleResVM>>(`${this.apiUrl}/articles/paginated`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
  
    });
  }

  
}