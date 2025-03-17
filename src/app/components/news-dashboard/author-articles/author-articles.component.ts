// src/app/components/author/author-articles/author-articles.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { AuthService } from '../../../services/auth.service';
import { ArticleResVM } from '../../../model/article-res-vm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-author-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-articles.component.html',
  styleUrl: './author-articles.component.css'
})
export class AuthorArticlesComponent implements OnInit {
  articles: ArticleResVM[] = [];
  currentUser: any = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    public router: Router, // Changer en public
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current user:', this.currentUser);
    this.loadAuthorArticles();

  }

  loadAuthorArticles(): void {
    const username = this.currentUser.username;
    console.log('Fetching articles for author:', username);
    
    this.articleService.getArticlesByAuthor(username).subscribe({
      next: (articles) => {
        console.log('Articles received:', articles);
        this.articles = articles;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load author articles:', err);
        this.errorMessage = 'Failed to load your articles. Please try again.';
        this.loading = false;
      },
      complete: () => {
        console.log('Articles request completed');
      }
    });
  }


  // Méthodes utilitaires pour la vue
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  navigateToEditArticle(articleId: string): void {
    this.router.navigate(['/author/articles/edit', articleId]);
  }

  confirmDeleteArticle(articleId: string): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.deleteArticle(articleId);
    }
  }

  deleteArticle(articleId: string): void {
    this.loading = true;
    
    this.articleService.deleteArticle(articleId).subscribe({
      next: () => {
        // Filtrer l'article supprimé de la liste locale
        this.articles = this.articles.filter(article => article.id !== articleId);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to delete article:', err);
        this.errorMessage = 'Failed to delete article. Please try again.';
        this.loading = false;
      }
    });
  }

  navigateToNewArticle(): void {
    this.router.navigate(['/author/articles/new']);
  }
}