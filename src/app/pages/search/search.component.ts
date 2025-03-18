import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleResVM } from '../../model/article-res-vm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  articles: ArticleResVM[] = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      
      if (this.searchQuery) {
        this.performSearch();
      }
    });
  }

  performSearch() {
    this.loading = true;
    this.searchService.searchArticles(this.searchQuery).subscribe({
      next: (results) => {
        this.articles = results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Search error', error);
        this.loading = false;
        this.articles = [];
      }
    });
  }
}
