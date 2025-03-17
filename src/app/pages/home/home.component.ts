import { Component, OnInit } from '@angular/core';
import { CardsHomeComponent } from '../../components/home/cards-home/cards-home.component';
import { LastCardsComponent } from "../../components/home/last-cards/last-cards.component";
import { ArticleResVM } from '../../model/article-res-vm';
import { ArticleService } from '../../services/article.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsHomeComponent, LastCardsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  articles: ArticleResVM[] = [];
  latestArticle: ArticleResVM | null = null;
  featuredArticles: ArticleResVM[] = [];
  newsArticles: ArticleResVM[] = [];
  politicsArticles: ArticleResVM[] = [];
  businessArticles: ArticleResVM[] = [];
  loading = true;

  constructor(
    private articleService: ArticleService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLatestArticle();
    this.fetchArticlesByCategories();
  }

  fetchLatestArticle(): void {
    this.articleService.getLatestArticle().subscribe({
      next: (article) => {
        this.latestArticle = article;
      },
      error: (err) => {
        console.error('Failed to fetch latest article:', err);
      },
    });
  }

  fetchArticlesByCategories(): void {
    this.loading = true;
    
    // Récupérer les derniers articles (sans filtrage par catégorie)
    this.articleService.getAllArticles().subscribe({
      next: (articles) => {
        // Filtrer uniquement les articles publiés
        const publishedArticles = articles.filter(article => article.published);
        
        // Trier par date de publication (du plus récent au plus ancien)
        this.articles = publishedArticles.sort((a, b) => {
          const dateA = new Date(a.publicationDate || '');
          const dateB = new Date(b.publicationDate || '');
          return dateB.getTime() - dateA.getTime();
        });

        // Extraire les articles pour chaque section
        this.featuredArticles = this.articles.slice(1, 2); // Second article
        this.newsArticles = this.articles.filter(a => a.category?.name === 'News').slice(0, 1);
        this.politicsArticles = this.articles.filter(a => a.category?.name === 'Politics').slice(0, 1);
        this.businessArticles = this.articles.filter(a => a.category?.name === 'Business').slice(0, 1);
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch articles:', err);
        this.loading = false;
      },
    });
  }

  navigateToArticle(articleId: string): void {
    if (articleId) {
      this.router.navigate(['/article', articleId]);
    }
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
    } else {
      return `${diffDays} days ago`;
    }
  }
}