import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-last-cards-business',
  imports: [CommonModule],
  templateUrl: './last-cards-business.component.html',
  styleUrl: './last-cards-business.component.css'
})
export class LastCardsBusinessComponent implements OnInit {
  articles: any[] = [];
  loading = true;
  categoryId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = +params.get('categoryId')!;
      this.fetchArticlesByCategory(this.categoryId);
    });
  }

  fetchArticlesByCategory(categoryId: number): void {
    this.articleService.getArticlesByCategoryId(categoryId).subscribe({
      next: (articles) => {
        this.articles = articles;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch articles:', err);
        this.loading = false;
      },
    });
  }
}
