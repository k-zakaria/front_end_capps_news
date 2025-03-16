// sidebar.component.ts
import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard', active: true },
    { label: 'Articles', icon: 'article', route: '/dashboard/articles', active: false },
    { label: 'Categories', icon: 'category', route: '/dashboard/categories', active: false },
    { label: 'Tags', icon: 'tag', route: '/dashboard/tags', active: false },
    { label: 'Users', icon: 'people', route: '/dashboard/users', active: false },
    { label: 'Settings', icon: 'settings', route: '/dashboard/settings', active: false },
  ];

  isSidebarCollapsed = false;

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
  
  setActiveItem(item: any) {
    // Reset all items
    this.menuItems.forEach(menuItem => menuItem.active = false);
    // Set the clicked item as active
    item.active = true;
  }
}