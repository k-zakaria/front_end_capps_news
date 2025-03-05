import { Component } from '@angular/core';
import { FirstCardsCultureComponent } from "../../components/culture/first-cards-culture/first-cards-culture.component";
import { LastCardsCultureComponent } from "../../components/culture/last-cards-culture/last-cards-culture.component";

@Component({
  selector: 'app-culture',
  imports: [FirstCardsCultureComponent, LastCardsCultureComponent],
  templateUrl: './culture.component.html',
  styleUrl: './culture.component.css'
})
export class CultureComponent {

}
