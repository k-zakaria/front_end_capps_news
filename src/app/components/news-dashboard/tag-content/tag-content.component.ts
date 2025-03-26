import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagService } from '../../../services/tag.service';
import { TagFormData, TagResVM } from '../../../model/tag-res-vm';

@Component({
  selector: 'app-tag-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-content.component.html',
  styleUrl: './tag-content.component.css'
})
export class TagContentComponent implements OnInit {
  tags: TagResVM[] = [];
  filteredTags: TagResVM[] = [];
  displayedTags: TagResVM[] = []; // Tags affichés après pagination
  
  // Pagination
  itemsPerPage = 5;  // Nombre d'items par page
  currentPage = 1;   // Page actuelle
  totalPages = 1;    // Nombre total de pages
  
  loading = true;
  isModalOpen = false;
  editMode = false;
  selectedTagId: number | null = null;
  
  tagForm: TagFormData = {
    name: ''
  };
  
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.fetchAllTags();
  }

  fetchAllTags(): void {
    this.loading = true;
    this.tagService.getAllTags().subscribe({
      next: (tags) => {
        this.tags = tags;
        this.filteredTags = tags; // Pour l'instant, pas de filtrage
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch tags:', err);
        this.loading = false;
        this.errorMessage = 'Failed to load tags. Please try again.';
      },
    });
  }
  
  // Méthode pour mettre à jour la pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTags.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
    }
    this.updateDisplayedTags();
  }

  // Méthode pour mettre à jour les tags affichés
  updateDisplayedTags(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedTags = this.filteredTags.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Méthode pour aller à une page spécifique
  goToPage(page: number | string): void {
    if (page === '...') return;
    
    const pageNum = typeof page === 'string' ? parseInt(page) : page;
    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.currentPage = pageNum;
      this.updateDisplayedTags();
    }
  }

  // Générer le tableau des pages à afficher
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
  
  openAddModal(): void {
    this.resetForm();
    this.editMode = false;
    this.selectedTagId = null;
    this.isModalOpen = true;
  }
  
  openEditModal(tag: TagResVM): void {
    this.tagForm = {
      name: tag.name
    };
    this.editMode = true;
    this.selectedTagId = tag.id;
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }
  
  resetForm(): void {
    this.tagForm = {
      name: ''
    };
    this.errorMessage = '';
    this.successMessage = '';
  }
  
  saveTag(): void {
    if (this.editMode && this.selectedTagId) {
      this.updateTag();
    } else {
      this.createTag();
    }
  }
  
  createTag(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.tagService.createTag(this.tagForm).subscribe({
      next: (newTag) => {
        this.tags.push(newTag);
        this.filteredTags = this.tags;
        this.updatePagination();
        this.successMessage = 'Tag created successfully!';
        this.loading = false;
        
        // Fermer la modale après un délai
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      },
      error: (err) => {
        console.error('Failed to create tag:', err);
        this.errorMessage = 'Failed to create tag. Please try again.';
        this.loading = false;
      }
    });
  }
  
  updateTag(): void {
    if (!this.selectedTagId) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    this.tagService.updateTag(this.selectedTagId, this.tagForm).subscribe({
      next: (updatedTag) => {
        // Mettre à jour le tag dans le tableau local
        const index = this.tags.findIndex(t => t.id === this.selectedTagId);
        if (index !== -1) {
          this.tags[index] = updatedTag;
        }
        
        this.filteredTags = this.tags;
        this.updatePagination();
        this.successMessage = 'Tag updated successfully!';
        this.loading = false;
        
        // Fermer la modale après un délai
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      },
      error: (err) => {
        console.error('Failed to update tag:', err);
        this.errorMessage = 'Failed to update tag. Please try again.';
        this.loading = false;
      }
    });
  }
  
  deleteTag(tagId: number): void {
    if (confirm('Are you sure you want to delete this tag?')) {
      this.loading = true;
      
      this.tagService.deleteTag(tagId).subscribe({
        next: () => {
          // Supprimer le tag du tableau local
          this.tags = this.tags.filter(t => t.id !== tagId);
          this.filteredTags = this.tags;
          this.updatePagination();
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to delete tag:', err);
          this.errorMessage = 'Failed to delete tag. Please try again.';
          this.loading = false;
        }
      });
    }
  }
}