import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/news-dashboard/sidebar/sidebar.component";
import { TopNavComponent } from "../../../components/news-dashboard/top-nav/top-nav.component";
import { MainContentComponent } from "../../../components/news-dashboard/main-content/main-content.component";
import { ArticleContentComponent } from "../../../components/news-dashboard/article-content/article-content.component";

@Component({
  selector: 'app-article',
  imports: [SidebarComponent, TopNavComponent, ArticleContentComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {

}
