import { Component, HostListener } from '@angular/core';
import { ScrollService } from 'src/app/servicefiles/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  

  constructor(private scrollService: ScrollService) {}

  scrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check the scroll position and update the opacity accordingly
    if (window.pageYOffset > 50) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }

  scrollToBottom() {
    this.scrollService.scrollToBottom();
  }

}
