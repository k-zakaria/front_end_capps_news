import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/news-dashboard/sidebar/sidebar.component";
import { TopNavComponent } from "../../../components/news-dashboard/top-nav/top-nav.component";
import { AuthorArticlesComponent } from "../../../components/news-dashboard/author-articles/author-articles.component";

@Component({
  selector: 'app-author-author',
  imports: [SidebarComponent, TopNavComponent, AuthorArticlesComponent],
  templateUrl: './author-author.component.html',
  styleUrl: './author-author.component.css'
})
export class AuthorAuthorComponent {

}
