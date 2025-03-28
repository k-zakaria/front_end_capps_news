// src/app/components/author/author-articles/author-articles.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { AuthService } from '../../../services/auth.service';
import { ArticleReqVM, ArticleResVM } from '../../../model/article-res-vm';
import { Observable } from 'rxjs';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { CategoryService } from '../../../services/category.service';
import { TagService } from '../../../services/tag.service';
import { CategoryResVM } from '../../../model/category-res-vm';
import { TagResVM } from '../../../model/tag-res-vm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-author-articles',
  standalone: true,
  imports: [CommonModule, TruncatePipe, FormsModule],
  templateUrl: './author-articles.component.html',
  styleUrl: './author-articles.component.css'
})
export class AuthorArticlesComponent implements OnInit {
  articles: ArticleResVM[] = [];
  filteredArticles: ArticleResVM[] = [];  // Articles filtrés (si besoin)
  displayedArticles: ArticleResVM[] = []; // Articles affichés après pagination
  currentUser: any = null;
  loading: boolean = true;
  errorMessage: string = '';
  categories: CategoryResVM[] = [];
  tags: TagResVM[] = [];

  // Pagination
  itemsPerPage = 5; // Nombre d'articles par page
  currentPage = 1;  // Page actuelle
  totalPages = 1;   // Nombre total de pages

  isModalOpen = false;
  previewModalOpen = false;
  confirmationModalOpen = false;
  editMode = false;
  selectedArticleId: string | null = null;
  previewArticle: ArticleResVM | null = null;
  imagePreview: string | null = null;
  successMessage: string = '';
  selectedFile: File | null = null;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    public router: Router, 
    private categoryService: CategoryService,
    private tagService: TagService
  ) { }

  articleForm: ArticleReqVM = {
    title: '',
    description: '',
    content: '',
    image: '',
    tagIds: [],
    categoryId: 0,
    published: false
  };

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromToken();

    if (this.currentUser) {
      this.loadAuthorArticles();
      this.fetchCategories();
      this.fetchTags();
    } else {
      this.errorMessage = 'Utilisateur non authentifié';
      this.loading = false;
    }
  }

  loadAuthorArticles(): void {
    if (!this.currentUser) return;

    const username = this.currentUser.username;

    this.articleService.getArticlesByAuthor(username).subscribe({
      next: (articles) => {
        this.articles = articles;
        this.filteredArticles = articles; 
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load author articles:', err);
        this.errorMessage = 'Failed to load your articles. Please try again.';
        this.loading = false;
      }
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredArticles.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
    }
    this.updateDisplayedArticles();
  }

  updateDisplayedArticles(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedArticles = this.filteredArticles.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number | string): void {
    if (page === '...') return;
    
    const pageNum = typeof page === 'string' ? parseInt(page) : page;
    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.currentPage = pageNum;
      this.updateDisplayedArticles();
    }
  }

  getPagesArray(): (number | string)[] {
    const pages: (number | string)[] = [];
    
    if (this.totalPages <= 7) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (this.currentPage <= 3) {
        pages.push(2, 3, 4, 5, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push('...', this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push('...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }
    
    return pages;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
      }
    });
  }

  fetchTags(): void {
    this.tagService.getAllTags().subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (err) => {
        console.error('Failed to fetch tags:', err);
      }
    });
  }

  openAddModal(): void {
    this.resetForm();
    this.editMode = false;
    this.selectedArticleId = null;
    this.isModalOpen = true;
  }

  openEditModal(article: ArticleResVM): void {
    this.resetForm();
    this.articleForm = {
      title: article.title,
      description: article.description,
      content: article.content,
      image: article.image || '',
      categoryId: article.category?.id || 0,
      tagIds: article.tags?.map(tag => tag.id) || [],
      published: article.published
    };

    this.selectedArticleId = article.id || null;
    this.editMode = true;
    this.isModalOpen = true;

    if (article.image) {
      this.imagePreview = article.image;
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  resetForm(): void {
    this.articleForm = {
      title: '',
      description: '',
      content: '',
      image: '',
      tagIds: [],
      categoryId: 0,
      published: false
    };
    this.selectedFile = null;
    this.imagePreview = null;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  toggleTagSelection(tagId: number): void {
    const index = this.articleForm.tagIds.indexOf(tagId);
    if (index === -1) {
      this.articleForm.tagIds.push(tagId);
    } else {
      this.articleForm.tagIds.splice(index, 1);
    }
  }

  isTagSelected(tagId: number): boolean {
    return this.articleForm.tagIds.includes(tagId);
  }

  saveArticle(): void {
    this.loading = true;
    this.errorMessage = '';

    if (this.editMode && this.selectedArticleId) {
      this.updateArticle();
    } else {
      this.createArticle();
    }
  }

  createArticle(): void {
    this.loading = true;
    this.errorMessage = '';

    this.articleService.createArticle(this.articleForm, this.selectedFile).subscribe({
      next: (newArticle) => {
        this.articles.push(newArticle);
        this.filteredArticles = this.articles; 
        this.updatePagination();
        this.successMessage = 'Article created successfully!';
        this.loading = false;

        setTimeout(() => {
          this.closeModal();
        }, 1500);
      },
      error: (err) => {
        console.error('Failed to create article:', err);
        this.errorMessage = 'Failed to create article. Please try again.';
        this.loading = false;
      }
    });
  }

  updateArticle(): void {
    if (!this.selectedArticleId) return;

    this.loading = true;
    this.errorMessage = '';

    this.articleService.updateArticle(this.selectedArticleId, this.articleForm, this.selectedFile).subscribe({
      next: (updatedArticle) => {
        const index = this.articles.findIndex(a => a.id === this.selectedArticleId);
        if (index !== -1) {
          this.articles[index] = updatedArticle;
        }
        this.filteredArticles = this.articles; 
        this.updatePagination(); 
        this.successMessage = 'Article updated successfully!';
        this.loading = false;

        setTimeout(() => {
          this.closeModal();
        }, 1500);
      },
      error: (err) => {
        console.error('Failed to update article:', err);
        this.errorMessage = 'Failed to update article. Please try again.';
        this.loading = false;
      }
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
        this.articles = this.articles.filter(article => article.id !== articleId);
        this.filteredArticles = this.articles; 
        this.updatePagination(); 
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