import { Component } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { Router } from '@angular/router';
import { ArticleResVM } from '../../../model/article-res-vm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-home',
  imports: [CommonModule],
  templateUrl: './cards-home.component.html',
  styleUrl: './cards-home.component.css'
})
export class CardsHomeComponent {
  featuredArticles: ArticleResVM[] = [];
  secondaryArticles: ArticleResVM[] = [];
  otherArticles: ArticleResVM[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private articleService: ArticleService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadLatestArticles();
  }

  loadLatestArticles(): void {
    this.loading = true;
    this.articleService.getAllArticles().subscribe({
      next: (articles) => {
        const publishedArticles = articles.filter(article => article.published);
        
        const sortedArticles = publishedArticles.sort((a, b) => {
          const dateA = new Date(a.publicationDate || 0);
          const dateB = new Date(b.publicationDate || 0);
          return dateB.getTime() - dateA.getTime();
        });
        
        this.featuredArticles = sortedArticles.slice(1, 3); 
        this.secondaryArticles = sortedArticles.slice(3, 6); 
        this.otherArticles = sortedArticles.slice(6, 8);
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load articles:', err);
        this.errorMessage = 'Failed to load latest articles.';
        this.loading = false;
      }
    });
  }

  navigateToArticle(articleId: string): void {
    this.router.navigate(['/article', articleId]);
  }

  getTimeAgo(date: string | null | undefined): string {
    if (!date) return '';
    
    const now = new Date();
    const publishDate = new Date(date);
    const diffMs = now.getTime() - publishDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        return 'Just now';
      }
      return `${diffHours} hrs ago`;
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return publishDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    }
  }

}
