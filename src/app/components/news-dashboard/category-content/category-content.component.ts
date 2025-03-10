import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { CategoryFormData, CategoryResVM } from '../../../model/category-res-vm';

@Component({
  selector: 'app-category-content',
  imports: [CommonModule, FormsModule],
  templateUrl: './category-content.component.html',
  styleUrl: './category-content.component.css'
})
export class CategoryContentComponent implements OnInit{
  categories: CategoryResVM[] = [];
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
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
        this.loading = false;
        this.errorMessage = 'Failed to load categories. Please try again.';
      },
    });
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
        this.successMessage = 'Category created successfully!';
        this.loading = false;
        
        // Fermer la modale après un délai
        setTimeout(() => {
          this.closeModal();
          this.fetchAllCategories(); // Rafraîchir la liste
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
        // Mettre à jour la catégorie dans le tableau local
        const index = this.categories.findIndex(c => c.id === this.selectedCategoryId);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
        
        this.successMessage = 'Category updated successfully!';
        this.loading = false;
        
        // Fermer la modale après un délai
        setTimeout(() => {
          this.closeModal();
          this.fetchAllCategories(); // Rafraîchir la liste
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
          // Supprimer la catégorie du tableau local
          this.categories = this.categories.filter(c => c.id !== categoryId);
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
  

  // openModal() {
  //   this.isModalOpen = true;
  // }

  // // Méthode pour fermer la modale
  // closeModal() {
  //   this.isModalOpen = false;
  // }

}
