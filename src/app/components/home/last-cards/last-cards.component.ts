import { Component, OnInit } from '@angular/core';
import { ArticleResVM } from '../../../model/article-res-vm';
import { ArticleService } from '../../../services/article.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-cards',
  imports: [DatePipe, CommonModule],
  templateUrl: './last-cards.component.html',
  styleUrl: './last-cards.component.css'
})
export class LastCardsComponent implements OnInit {
  articles: ArticleResVM[] = [];
  latestArticle: ArticleResVM | null = null;
  loading = true;
  readonly maxArticles = 20;

  constructor(private articleService: ArticleService, private router: Router,) { }

  ngOnInit(): void {
    this.fetchAllArticles();
  }


  fetchAllArticles(): void {
    this.articleService.getPaginatedArticles(0, this.maxArticles).subscribe({
      next: (response) => {
        this.articles = response.content.filter(article => article.published);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch articles:', err);
        this.loading = false;
      },
    });
  }

  navigateToArticle(articleId: string): void {
    this.router.navigate(['/article', articleId]);
  }
}
