import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/news-dashboard/sidebar/sidebar.component";
import { TopNavComponent } from "../../../components/news-dashboard/top-nav/top-nav.component";
import { CategoryContentComponent } from "../../../components/news-dashboard/category-content/category-content.component";


@Component({
  selector: 'app-category',
  imports: [SidebarComponent, TopNavComponent, CategoryContentComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
