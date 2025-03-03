import { Component } from '@angular/core';
import { FirstCardsComponent } from "../../components/sport/first-cards/first-cards.component";
import { LastCardsComponent } from "../../components/sport/last-cards/last-cards.component";

@Component({
  selector: 'app-sport',
  imports: [FirstCardsComponent, LastCardsComponent],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.css'
})
export class SportComponent {

}
