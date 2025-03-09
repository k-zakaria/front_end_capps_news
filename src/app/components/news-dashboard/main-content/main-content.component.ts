import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleResVM } from '../../../model/article-res-vm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {

  integrations = [
    { name: 'Mailchimp', logo: 'https://via.placeholder.com/40', description: 'Online platform for sending professional emails to mass recipients.' },
    // Add more integrations as needed
  ];

  // Liste des tags disponibles
  availableTags: string[] = ['Technology', 'Health', 'Education', 'Travel', 'Food'];

  // Objet pour stocker les tags sélectionnés
  selectedTags: { [key: string]: boolean } = {};

  isModalOpen = false;

  // Méthode pour ouvrir la modale
  openModal() {
    this.isModalOpen = true;
  }

  // Méthode pour fermer la modale
  closeModal() {
    this.isModalOpen = false;
  }

  // Méthode pour obtenir les tags sélectionnés
  getSelectedTags(): string[] {
    return Object.keys(this.selectedTags).filter(tag => this.selectedTags[tag]);
  }


  
}