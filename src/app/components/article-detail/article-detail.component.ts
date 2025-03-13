import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ArticleResVM } from '../../model/article-res-vm';
import { FormatContentPipe } from '../../pipes/format-content.pipe';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, FormatContentPipe],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
  article: ArticleResVM | null = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const articleId = params.get('id');
      if (articleId) {
        this.loadArticle(articleId);
      } else {
        this.errorMessage = 'Article ID is missing';
        this.loading = false;
      }
    });
  }

  loadArticle(articleId: string): void {
    this.loading = true;
    this.articleService.getArticleById(articleId).subscribe({
      next: (article) => {
        this.article = article;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load article:', err);
        this.errorMessage = 'Failed to load article. Please try again.';
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  
}