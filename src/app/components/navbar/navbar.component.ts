import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchQuery: string = '';
  
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.user;
  isAuthenticated = this.authService.isUserLoginenticated();
  
  isDropdownOpen: boolean = false;

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchQuery }
      });
      this.searchQuery = ''; 
    }
  }

  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    this.isDropdownOpen = false;
  }

  goToDashboard() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      if (currentUser.role === 'ADMIN') {
        this.router.navigate(['/dashboard/articles']);
      } else if (currentUser.role === 'AUTHOR') {
        this.router.navigate(['/dashboard/author/articles']);
      } else {
        this.router.navigate(['/']);
      }
    }
    this.isDropdownOpen = false;
  }

  getUserInitials(): string {
    const username = this.user()?.username;
    return username 
      ? username.split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .slice(0, 2)
          .join('')
      : '';
  }

  navItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news/1' },
    { label: 'Sport', path: '/sport/2' },
    { label: 'Business', path: '/business/3' },
    { label: 'Innovation', path: '/innovation/4' },
    { label: 'Culture', path: '/culture/5' },
    { label: 'Arts', path: '/arts/6' },
    { label: 'Travel', path: '/travel/7' },
    { label: 'Earth', path: '/earth/8' }
  ];
}