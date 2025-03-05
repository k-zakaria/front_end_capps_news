import { Component, OnInit } from '@angular/core';
import { CardsHomeComponent } from '../../components/home/cards-home/cards-home.component';
import { LastCardsComponent } from "../../components/home/last-cards/last-cards.component";
import { ArticleResVM } from '../../model/article-res-vm';
import { ArticleService } from '../../services/article.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CardsHomeComponent, LastCardsComponent, CommonModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  articles: ArticleResVM[] = [];
  latestArticle: ArticleResVM | null = null;
  loading = true;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.fetchAllArticles();
    this.fetchLatestArticle();
  }

  fetchAllArticles(): void {
    this.articleService.getAllArticles().subscribe({
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
}
