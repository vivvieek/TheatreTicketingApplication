import { Component } from '@angular/core';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})
export class BookingpageComponent {

  isHighlighted: boolean = false;

  highlightDiv() {
    this.isHighlighted = !this.isHighlighted;
  }
}
