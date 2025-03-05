import { Component } from '@angular/core';
import { FirstCardsArtsComponent } from "../../components/arts/first-cards-arts/first-cards-arts.component";
import { LastCardsArtsComponent } from "../../components/arts/last-cards-arts/last-cards-arts.component";

@Component({
  selector: 'app-arts',
  imports: [FirstCardsArtsComponent, LastCardsArtsComponent],
  templateUrl: './arts.component.html',
  styleUrl: './arts.component.css'
})
export class ArtsComponent {

}
