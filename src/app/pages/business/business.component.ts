import { Component } from '@angular/core';
import { FirstCardsBusinessComponent } from "../../components/business/first-cards-business/first-cards-business.component";
import { LastCardsBusinessComponent } from "../../components/business/last-cards-business/last-cards-business.component";

@Component({
  selector: 'app-business',
  imports: [FirstCardsBusinessComponent, LastCardsBusinessComponent],
  templateUrl: './business.component.html',
  styleUrl: './business.component.css'
})
export class BusinessComponent {

}
