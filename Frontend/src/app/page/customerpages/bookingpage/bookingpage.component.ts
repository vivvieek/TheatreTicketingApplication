import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/servicefiles/datas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})
export class BookingpageComponent implements OnInit {

  movie:any;
  item:any
  id:any;
  bookticket!:FormGroup;
  seatsSelected: number=1;

  constructor(private serv:DatasService, private activatedRoute:ActivatedRoute,private fb:FormBuilder,private router:Router){
    this.bookticket=new FormGroup({
      "name": new FormControl(""),
      "category": new FormControl(""),
      "language": new FormControl(""),
      "cast": new FormControl(""),
      "description": new FormControl(""),
      "rating": new FormControl(""),
      "seats": new FormControl(""),
      "seatsbooked" : new FormControl(""),
      "price": new FormControl(""),
      "screen": new FormControl(""),
      "image": new FormControl(""),
    })
  }

  isHighlighted: boolean = false;

  highlightDiv() {
    this.isHighlighted = !this.isHighlighted;
  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    this.serv.getonemovie(this.id).subscribe((data)=>{
      this.item=data
      console.log(this.item)
      this.bookticket = this.fb.group({
        "name": this.item.name,
        "category": this.item.category,
        "language": this.item.language,
        "cast": this.item.cast,
        "description": this.item.description,
        "rating": this.item.rating,
        "seats": this.item.seats,
        "price": this.item.price,
        "screen": this.item.screen,
        "image": this.item.image,
        "seatsbooked": [this.item.seatsbooked, Validators.required],
      })
    })
  }

  getAvailabilityStatus() {
    if (this.item.seatsbooked < this.item.seats / 2) {
      return 'available';
    } else if (this.item.seatsbooked == this.item.seats) {
      return 'housefull';
    } else {
      return 'fastfilling';
    }
  }

  updateSeatsBooked() {
    const selectedSeats = this.seatsSelected; // Get the selected number of seats
    // const currentSeatsBooked = this.bookticket.get('seatsbooked').value || 0;
    const currentSeatsBooked = this.item.seatsbooked;
    const newSeatsBooked = currentSeatsBooked + selectedSeats;
  
    // Check if the newSeatsBooked is within the allowed range (0 to this.item.seats)
    if (newSeatsBooked >= 0 && newSeatsBooked <= this.item.seats) {
      this.bookticket.patchValue({ seatsbooked: newSeatsBooked });
    } else {
      // Handle the case where the user selects more seats than available or a negative number of seats
      // You can display an error message or take appropriate action here.
      // For now, I'll just log an error message.
      console.error('Invalid number of seats selected');
    }
  }


  onsubmit(){
    console.log(this.bookticket.value)
    this.serv.editmovie(this.bookticket.value,this.id).subscribe(data=>{
      console.log(data)
      alert("Seat Booked")
      this.router.navigate(['movielist'])
    })
  }
}
