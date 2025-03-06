import { Component } from '@angular/core';
import { FirstCardsNewsComponent } from "../../components/news/first-cards-news/first-cards-news.component";
import { LastCardsNewsComponent } from "../../components/news/last-cards-news/last-cards-news.component";

@Component({
  selector: 'app-news',
  imports: [FirstCardsNewsComponent, LastCardsNewsComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

}
