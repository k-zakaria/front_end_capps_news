import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active: boolean;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private renderer: Renderer2, 
    private el: ElementRef,
    private authService: AuthService
  ) {}

  // Define all possible menu items
  allMenuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard', active: false, roles: ['AUTHOR','ADMIN'] },
    { label: 'Articles', icon: 'article', route: '/dashboard/articles', active: false, roles: ['ADMIN'] },
    { label: 'Categories', icon: 'category', route: '/dashboard/categories', active: false, roles: ['ADMIN'] },
    { label: 'Tags', icon: 'tag', route: '/dashboard/tags', active: false, roles: ['ADMIN'] },
    { label: 'Users', icon: 'people', route: '/dashboard/users', active: false, roles: ['ADMIN'] },
    { label: 'My Articles', icon: 'article', route: '/dashboard/author/articles', active: false, roles: ['AUTHOR', 'ADMIN'] },
    { label: 'Settings', icon: 'settings', route: '/dashboard/settings', active: false, roles: ['AUTHOR', 'ADMIN'] },
  ];

  // Initialize with proper type
  menuItems: MenuItem[] = [];
  isSidebarCollapsed = false;

  ngOnInit() {
    this.filterMenuItemsByRole();
  }

  filterMenuItemsByRole() {
    const currentUser = this.authService.getCurrentUser();
    const userRole = currentUser?.role || '';
    
    console.log('Current user role:', userRole);
    
    // For AUTHOR role - only show My Articles and Settings
    if (userRole === 'AUTHOR') {
      this.menuItems = this.allMenuItems.filter(item => 
        item.label === 'My Articles' || item.label === 'Settings'
      );
    } 
    // For ADMIN role - show all admin items
    else if (userRole === 'ADMIN') {
      this.menuItems = this.allMenuItems;
    } 
    // Default fallback - just show Settings
    else {
      this.menuItems = this.allMenuItems.filter(item => 
        item.label === 'Settings'
      );
    }
    
    // Set the first item as active by default
    if (this.menuItems.length > 0) {
      this.menuItems.forEach(item => item.active = false);
      this.menuItems[0].active = true;
    }
  }

  toggleSidebar() {
    const sidebar = this.el.nativeElement.querySelector('#sidebar');
    if (sidebar) {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      if (this.isSidebarCollapsed) {
        this.renderer.removeClass(sidebar, 'w-64');
        this.renderer.addClass(sidebar, 'w-16');
      } else {
        this.renderer.removeClass(sidebar, 'w-16');
        this.renderer.addClass(sidebar, 'w-64');
      }
    } else {
      console.error('Sidebar element not found!');
    }
  }
  
  setActiveItem(item: MenuItem) {
    // Reset all items
    this.menuItems.forEach(menuItem => menuItem.active = false);
    // Set the clicked item as active
    item.active = true;
  }
}