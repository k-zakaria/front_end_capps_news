import { Component, OnInit } from '@angular/core';
import { ArticleResVM } from '../../../model/article-res-vm';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-first-cards-arts',
  imports: [CommonModule, RouterLink],
  templateUrl: './first-cards-arts.component.html',
  styleUrl: './first-cards-arts.component.css'
})
export class FirstCardsArtsComponent implements OnInit {
  cultureArticles: ArticleResVM[] = [];
  loading = true;
  featuredArticle: ArticleResVM | null = null;
  categoryId: number | null = null;
  
  constructor(private articleService: ArticleService, private route: ActivatedRoute,) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = +params.get('categoryId')!;
      this.fetchCultureArticles(this.categoryId);
    });
  }

  
  fetchCultureArticles(categoryId: number): void {
    this.articleService.getArticlesByCategoryId(categoryId).subscribe({
      next: (articles) => {
        // Tri par date de publication (du plus récent au plus ancien)
        const sortedArticles = articles.sort((a, b) => {
          return new Date(b.publicationDate || '').getTime() - new Date(a.publicationDate || '').getTime();
        });
        
        // Sélectionner l'article en vedette (le plus long ou le plus récent)
        this.featuredArticle = sortedArticles.find(article => 
          article.content && article.content.length > 500
        ) || sortedArticles[0];
        
        // Filtrer l'article en vedette des autres articles
        this.cultureArticles = sortedArticles.filter(article => 
          article.id !== this.featuredArticle?.id
        ).slice(0, 4); // Prendre les 4 premiers autres articles
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch culture articles:', err);
        this.loading = false;
      }
    });
  }

  getTimeAgo(dateString: string | null | undefined): string {
    if (!dateString) return '';
    
    const now = new Date();
    const publishDate = new Date(dateString);
    const diffHours = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60));
    
    return `${diffHours} hrs ago`;
  }
}
