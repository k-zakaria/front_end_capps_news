import { Component } from '@angular/core';
import { ArticleComponent } from "../../pages/news-dashboard/article/article.component";
import { CategoryComponent } from "../../pages/news-dashboard/category/category.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashbords',
  imports: [RouterOutlet],
  templateUrl: './dashbords.component.html',
  styleUrl: './dashbords.component.css'
})
export class DashbordsComponent {

}
