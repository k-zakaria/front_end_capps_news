import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-last-cards-culture',
  imports: [CommonModule],
  templateUrl: './last-cards-culture.component.html',
  styleUrl: './last-cards-culture.component.css'
})
export class LastCardsCultureComponent implements OnInit {
  articles: any[] = [];
  loading = true;
  categoryId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
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
        this.articles = articles.filter(article => article.published);
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
