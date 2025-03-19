import { Component } from '@angular/core';
import { ProfileContentComponent } from "../../components/profile-content/profile-content.component";

@Component({
  selector: 'app-profile',
  imports: [ProfileContentComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
