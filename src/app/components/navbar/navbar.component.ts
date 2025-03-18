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
  
  // Inject services
  private authService = inject(AuthService);
  private router = inject(Router);

  // Expose user and authentication status
  user = this.authService.user;
  isAuthenticated = this.authService.isUserLoginenticated();
  
  // Dropdown state
  isDropdownOpen: boolean = false;

  performSearch() {
    if (this.searchQuery.trim()) {
      // Navigate to search results page with query
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchQuery }
      });
      this.searchQuery = ''; // Reset search input
    }
  }

  // Logout method using AuthService
  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
  }

  // Toggle dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Navigate to profile
  goToProfile() {
    this.router.navigate(['/profile']);
    this.isDropdownOpen = false;
  }

  // Navigate to dashboard
  goToDashboard() {
    this.router.navigate(['/dashboard']);
    this.isDropdownOpen = false;
  }

  // Get initials for user avatar
  getUserInitials(): string {
    const username = this.user()?.username;
    return username 
      ? username.split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .slice(0, 2)
          .join('')
      : '';
  }

  // Navigation items
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