import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  menuItems = [
    { label: 'Dashboards', icon: 'home', active: false },
    { label: 'Pages', icon: 'file', active: false },
    { label: 'Integrations', icon: 'link', active: true },
    // Add more items as needed
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
}