import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { CategoryService } from '../../../services/category.service';
import { TagService } from '../../../services/tag.service';
import { ArticleReqVM, ArticleResVM } from '../../../model/article-res-vm';
import { CategoryResVM } from '../../../model/category-res-vm';
import { TagResVM } from '../../../model/tag-res-vm';

@Component({
  selector: 'app-article-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-content.component.html',
  styleUrl: './article-content.component.css'
})
export class ArticleContentComponent implements OnInit {
  articles: ArticleResVM[] = [];
  filteredArticles: ArticleResVM[] = [];
  displayedArticles: ArticleResVM[] = []; // Nouvelle propriété pour les articles affichés après pagination
  categories: CategoryResVM[] = [];
  tags: TagResVM[] = [];
  
  // Pagination
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 1;
  
  // Filtres
  searchQuery = '';
  categoryFilter: number | null = null;
  statusFilter: boolean | null = null;
  dateFilter: string | null = null;
  
  // État du chargement et des modals
  loading = false;
  isModalOpen = false;
  previewModalOpen = false;
  confirmationModalOpen = false;
  editMode = false;
  selectedArticleId: string | null = null;
  previewArticle: ArticleResVM | null = null;
  
  // Confirmation
  confirmationTitle = '';
  confirmationMessage = '';
  confirmationActionText = '';
  confirmationActionType = '';
  confirmationCallback: (() => void) | null = null;
  
  articleForm: ArticleReqVM = {
    title: '',
    description: '',
    content: '',
    image: '',
    tagIds: [],
    categoryId: 0,
    published: false
  };
  
  errorMessage: string = '';
  successMessage: string = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.fetchAllArticles();
    this.fetchCategories();
    this.fetchTags();
  }

  fetchAllArticles(): void {
    this.loading = true;
    this.articleService.getAllArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch articles:', err);
        this.loading = false;
        this.errorMessage = 'Failed to load articles. Please try again.';
      },
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
    
    // Prévisualization de l'image si disponible
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
      
      // Créer une URL pour prévisualiser l'image
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
        this.successMessage = 'Article created successfully!';
        this.loading = false;
        this.applyFilters();
        
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
        
        this.successMessage = 'Article updated successfully!';
        this.loading = false;
        this.applyFilters();
        
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
  
  deleteArticle(articleId: string): void {
    this.showConfirmationModal(
      'Delete Article',
      'Are you sure you want to delete this article? This action cannot be undone.',
      'Delete',
      'delete',
      () => this.performDeleteArticle(articleId)
    );
  }
  
  performDeleteArticle(articleId: string): void {
    this.loading = true;
    
    this.articleService.deleteArticle(articleId).subscribe({
      next: () => {
        this.articles = this.articles.filter(a => a.id !== articleId);
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to delete article:', err);
        this.errorMessage = 'Failed to delete article. Please try again.';
        this.loading = false;
      }
    });
  }
  
  togglePublishStatus(article: ArticleResVM): void {
    const action = article.published ? 'unpublish' : 'publish';
    const actionText = article.published ? 'Unpublish' : 'Publish';
    
    this.showConfirmationModal(
      `${actionText} Article`,
      `Are you sure you want to ${action} this article?`,
      actionText,
      action,
      () => this.performTogglePublishStatus(article)
    );
  }
  
  performTogglePublishStatus(article: ArticleResVM): void {
    this.loading = true;
    
    if (article.published) {
      // Dépublier l'article
      this.articleService.unpublishArticle(article.id).subscribe({
        next: (updatedArticle) => {
          const index = this.articles.findIndex(a => a.id === article.id);
          if (index !== -1) {
            this.articles[index] = updatedArticle;
          }
          this.applyFilters();
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to unpublish article:', err);
          this.errorMessage = 'Failed to unpublish article. Please try again.';
          this.loading = false;
        }
      });
    } else {
      // Publier l'article
      this.articleService.publishArticle(article.id).subscribe({
        next: (updatedArticle) => {
          const index = this.articles.findIndex(a => a.id === article.id);
          if (index !== -1) {
            this.articles[index] = updatedArticle;
          }
          this.applyFilters();
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to publish article:', err);
          this.errorMessage = 'Failed to publish article. Please try again.';
          this.loading = false;
        }
      });
    }
  }
  
  // Méthodes de prévisualisation
  openPreviewModal(article: ArticleResVM): void {
    this.previewArticle = article;
    this.previewModalOpen = true;
  }
  
  closePreviewModal(): void {
    this.previewModalOpen = false;
    this.previewArticle = null;
  }
  
  formatContentForPreview(content: string): string {
    // Convertir les sauts de ligne en balises <p>
    return content.split('\n\n')
      .filter(paragraph => paragraph.trim() !== '')
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }
  
  // Méthodes de confirmation
  showConfirmationModal(title: string, message: string, actionText: string, actionType: string, callback: () => void): void {
    this.confirmationTitle = title;
    this.confirmationMessage = message;
    this.confirmationActionText = actionText;
    this.confirmationActionType = actionType;
    this.confirmationCallback = callback;
    this.confirmationModalOpen = true;
  }
  
  confirmAction(): void {
    this.confirmationModalOpen = false;
    if (this.confirmationCallback) {
      this.confirmationCallback();
    }
  }
  
  cancelConfirmation(): void {
    this.confirmationModalOpen = false;
  }
  
  // Méthodes de formatage
  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  truncateText(text: string, maxLength: number = 100): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  // Méthodes de filtrage et pagination
  applyFilters(): void {
    let result = [...this.articles];
    
    // Filtrer par recherche
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(article => 
        article.title?.toLowerCase().includes(query) || 
        article.description?.toLowerCase().includes(query) ||
        article.content?.toLowerCase().includes(query)
      );
    }
    
    // Filtrer par catégorie
    if (this.categoryFilter !== null) {
      result = result.filter(article => article.category?.id === this.categoryFilter);
    }
    
    // Filtrer par statut (publié/brouillon)
    if (this.statusFilter !== null) {
      result = result.filter(article => article.published === this.statusFilter);
    }
    
    // Filtrer par date
    if (this.dateFilter) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      
      result = result.filter(article => {
        if (!article.publicationDate) return false;
        
        const pubDate = new Date(article.publicationDate);
        
        switch (this.dateFilter) {
          case 'today':
            return pubDate >= today;
          case 'thisWeek':
            return pubDate >= startOfWeek;
          case 'thisMonth':
            return pubDate >= startOfMonth;
          case 'lastMonth':
            return pubDate >= startOfLastMonth && pubDate <= endOfLastMonth;
          default:
            return true;
        }
      });
    }
    
    // Mettre à jour les articles filtrés et la pagination
    this.filteredArticles = result;
    this.totalPages = Math.ceil(this.filteredArticles.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
    }
    
    // Calculer les articles à afficher basés sur la pagination actuelle
    this.updateDisplayedArticles();
  }
  
  // Nouvelle méthode pour mettre à jour les articles affichés
  updateDisplayedArticles(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedArticles = this.filteredArticles.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  clearFilters(): void {
    this.searchQuery = '';
    this.categoryFilter = null;
    this.statusFilter = null;
    this.dateFilter = null;
    this.applyFilters();
  }
  
  isFilterActive(): boolean {
    return !!(this.searchQuery || this.categoryFilter !== null || this.statusFilter !== null || this.dateFilter);
  }
  
  // Pagination
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
      // Afficher toutes les pages si moins de 7 pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Toujours afficher la première page
      pages.push(1);
      
      // Afficher des points de suspension ou les pages autour de la page actuelle
      if (this.currentPage <= 3) {
        // Près du début
        pages.push(2, 3, 4, 5, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        // Près de la fin
        pages.push('...', this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        // Au milieu
        pages.push('...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }
    
    return pages;
  }
}