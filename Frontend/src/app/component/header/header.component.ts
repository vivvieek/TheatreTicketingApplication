import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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

}
