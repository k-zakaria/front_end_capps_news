import { Component } from '@angular/core';
import { FirstCardsEarthComponent } from "../../components/earth/first-cards-earth/first-cards-earth.component";
import { LastCardsEarthComponent } from "../../components/earth/last-cards-earth/last-cards-earth.component";

@Component({
  selector: 'app-earth',
  imports: [FirstCardsEarthComponent, LastCardsEarthComponent],
  templateUrl: './earth.component.html',
  styleUrl: './earth.component.css'
})
export class EarthComponent {

}
