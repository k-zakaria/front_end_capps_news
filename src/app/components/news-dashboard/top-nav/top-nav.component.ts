// top-nav.component.ts
import { Component, OnInit, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthUser, UserLogin } from '../../../model/UserLogin';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  isProfileMenuOpen = false;
  isDarkMode = false;
  currentUser: AuthUser | null = null;
  
  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    // Suivre les changements du signal user
    effect(() => {
      this.currentUser = this.authService.user();
    });
    
    // Charger la préférence de thème depuis localStorage
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  ngOnInit(): void {
    // Initialiser l'utilisateur courant au démarrage
    this.currentUser = this.authService.getUser();
  }

  // Méthode pour obtenir les détails complets de l'utilisateur (avec le rôle)
  getCurrentUserDetails(): AuthUser | null {
    return this.authService.getCurrentUser();
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme(): void {
    // Appliquer le thème au document
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  logout(): void {
    this.authService.logout();
    this.isProfileMenuOpen = false;
  }

  getUserInitials(): string {
    if (!this.currentUser || !this.currentUser.username) {
      return '?';
    }
    
    // Extraire les initiales du nom d'utilisateur
    const username = this.currentUser.username;
    if (username.includes(' ')) {
      // Si le nom contient un espace, prendre les premières lettres de chaque partie
      const nameParts = username.split(' ');
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    } else {
      // Sinon, prendre la première lettre du nom
      return username[0].toUpperCase();
    }
  }

  // Ferme le menu si l'utilisateur clique ailleurs sur la page
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const profileButton = document.getElementById('profile-dropdown');
    const profileMenu = document.getElementById('profile-menu');

    // Vérifie si le clic est en dehors du bouton de profil et du menu
    if (profileButton && profileMenu && 
        !profileButton.contains(target) && 
        !profileMenu.contains(target)) {
      this.isProfileMenuOpen = false;
    }
  }
}