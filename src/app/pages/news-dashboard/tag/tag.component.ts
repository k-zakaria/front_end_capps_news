import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/news-dashboard/sidebar/sidebar.component";
import { TopNavComponent } from "../../../components/news-dashboard/top-nav/top-nav.component";
import { TagContentComponent } from "../../../components/news-dashboard/tag-content/tag-content.component";

@Component({
  selector: 'app-tag',
  imports: [SidebarComponent, TopNavComponent, TagContentComponent],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {

}
