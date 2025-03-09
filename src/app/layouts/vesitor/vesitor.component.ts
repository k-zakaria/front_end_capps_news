import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vesitor',
  imports: [NavbarComponent , RouterOutlet],
  templateUrl: './vesitor.component.html',
  styleUrl: './vesitor.component.css'
})
export class VesitorComponent {

}
