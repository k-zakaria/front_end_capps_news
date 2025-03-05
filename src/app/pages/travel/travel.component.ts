import { Component } from '@angular/core';
import { FirstCardsTravelComponent } from "../../components/travel/first-cards-travel/first-cards-travel.component";
import { LastCardsTravelComponent } from "../../components/travel/last-cards-travel/last-cards-travel.component";

@Component({
  selector: 'app-travel',
  imports: [FirstCardsTravelComponent, LastCardsTravelComponent],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.css'
})
export class TravelComponent {

}
