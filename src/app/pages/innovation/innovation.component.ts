import { Component } from '@angular/core';
import { LastCardsInnovationComponent } from "../../components/innovation/last-cards-innovation/last-cards-innovation.component";
import { FirstCardsInnovationComponent } from "../../components/innovation/first-cards-innovation/first-cards-innovation.component";

@Component({
  selector: 'app-innovation',
  imports: [LastCardsInnovationComponent, FirstCardsInnovationComponent],
  templateUrl: './innovation.component.html',
  styleUrl: './innovation.component.css'
})
export class InnovationComponent {

}
