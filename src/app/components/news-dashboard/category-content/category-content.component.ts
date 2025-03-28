import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { CategoryFormData, CategoryResVM } from '../../../model/category-res-vm';

@Component({
  selector: 'app-category-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-content.component.html',
  styleUrl: './category-content.component.css'
})
export class CategoryContentComponent implements OnInit{
  categories: CategoryResVM[] = [];
  filteredCategories: CategoryResVM[] = [];
  displayedCategories: CategoryResVM[] = [];
  
 
  itemsPerPage = 5;  
  currentPage = 1;   
  totalPages = 1;    
  
  loading = true;
  isModalOpen = false;
  editMode = false;
  selectedCategoryId: number | null = null;
  
  categoryForm: CategoryFormData = {
    name: '',
    description: ''
  };
  
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchAllCategories();
  }

  fetchAllCategories(): void {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.filteredCategories = categories; 
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
        this.loading = false;
        this.errorMessage = 'Failed to load categories. Please try again.';
      },
    });
  }
  
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCategories.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
    }
    this.updateDisplayedCategories();
  }

  updateDisplayedCategories(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedCategories = this.filteredCategories.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number | string): void {
    if (page === '...') return;
    
    const pageNum = typeof page === 'string' ? parseInt(page) : page;
    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.currentPage = pageNum;
      this.updateDisplayedCategories();
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
  
  openAddModal(): void {
    this.resetForm();
    this.editMode = false;
    this.selectedCategoryId = null;
    this.isModalOpen = true;
  }
  
  openEditModal(category: CategoryResVM): void {
    this.categoryForm = {
      name: category.name,
      description: category.description
    };
    this.editMode = true;
    this.selectedCategoryId = category.id;
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }
  
  resetForm(): void {
    this.categoryForm = {
      name: '',
      description: ''
    };
    this.errorMessage = '';
    this.successMessage = '';
  }
  
  saveCategory(): void {
    if (this.editMode && this.selectedCategoryId) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }
  
  createCategory(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.categoryService.createCategory(this.categoryForm).subscribe({
      next: (newCategory) => {
        this.categories.push(newCategory);
        this.filteredCategories = this.categories;
        this.updatePagination();
        this.successMessage = 'Category created successfully!';
        this.loading = false;
        
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      },
      error: (err) => {
        console.error('Failed to create category:', err);
        this.errorMessage = 'Failed to create category. Please try again.';
        this.loading = false;
      }
    });
  }
  
  updateCategory(): void {
    if (!this.selectedCategoryId) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    this.categoryService.updateCategory(this.selectedCategoryId, this.categoryForm).subscribe({
      next: (updatedCategory) => {
        const index = this.categories.findIndex(c => c.id === this.selectedCategoryId);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
        
        this.filteredCategories = this.categories;
        this.updatePagination();
        this.successMessage = 'Category updated successfully!';
        this.loading = false;
        
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      },
      error: (err) => {
        console.error('Failed to update category:', err);
        this.errorMessage = 'Failed to update category. Please try again.';
        this.loading = false;
      }
    });
  }
  
  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.loading = true;
      
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== categoryId);
          this.filteredCategories = this.categories;
          this.updatePagination();
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to delete category:', err);
          this.errorMessage = 'Failed to delete category. Please try again.';
          this.loading = false;
        }
      });
    }
  }
}