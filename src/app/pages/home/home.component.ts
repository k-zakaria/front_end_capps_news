import { Component } from '@angular/core';
import { CardsHomeComponent } from '../../components/home/cards-home/cards-home.component';
import { LastCardsComponent } from "../../components/home/last-cards/last-cards.component";

@Component({
  selector: 'app-home',
  imports: [CardsHomeComponent, LastCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

}
