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
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch tags:', err);
        this.loading = false;
        this.errorMessage = 'Failed to load tags. Please try again.';
      },
    });
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
        this.successMessage = 'Tag created successfully!';
        this.loading = false;
        
        // Fermer la modale après un délai
        setTimeout(() => {
          this.closeModal();
          this.fetchAllTags(); // Rafraîchir la liste
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
        
        this.successMessage = 'Tag updated successfully!';
        this.loading = false;
        
        // Fermer la modale après un délai
        setTimeout(() => {
          this.closeModal();
          this.fetchAllTags(); // Rafraîchir la liste
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