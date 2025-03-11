import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/news-dashboard/sidebar/sidebar.component";
import { TopNavComponent } from "../../../components/news-dashboard/top-nav/top-nav.component";
import { UserContentComponent } from "../../../components/news-dashboard/user-content/user-content.component";

@Component({
  selector: 'app-user',
  imports: [SidebarComponent, TopNavComponent, UserContentComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
