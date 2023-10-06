import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/servicefiles/datas.service';
import { LoginService } from 'src/app/servicefiles/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})
export class BookingpageComponent implements OnInit {

  bookticket!:FormGroup;
  item:any={
    name:'',
    category: '',
    language: '',
    cast: '',
    description: '',
    rating: '',
    seats: '',
    price: '',
    screen: '',
    image: '',
    seatsbooked: '',
  };
  id:any;
  isHighlighted: boolean = false;
  selectedSeatsValue: string = '1';
  currentUser:any;
  numbseats:any;

  constructor(private serv:DatasService, private activatedRoute:ActivatedRoute,private fb:FormBuilder,private router:Router,private serv2:LoginService){
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

  

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    this.serv.getonemovie(this.id).subscribe((data)=>{
      this.item=data;
      console.log(this.item);
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
        "seatsbooked": this.item.seatsbooked,
      })
    })
    this.updateCus();
  }

  getAvailabilityStatus() {
    if (this.item.seatsbooked < this.item.seats) {
      return 'available';
    } else if ( this.item.seats == 0 ) {
      return 'housefull';
    } else if (this.item.seatsbooked > this.item.seats || this.item.seatsbooked == this.item.seats ) {
      return 'fastfilling';
    } else {
      return 'error';
    }
  }

  highlightDiv() {
    this.isHighlighted = !this.isHighlighted;
  }

  onSeatsSelectedChange(selectedValue: string) {
    this.selectedSeatsValue = selectedValue;
  }

  updateCus(){
    this.currentUser=this.serv2.getUser();
  }


  onSubmit() {
    const selectedSeats = +this.selectedSeatsValue; // Convert it to a number if it's a string
    this.numbseats= this.selectedSeatsValue;
    if (selectedSeats <= this.item.seats) {
      this.bookticket.patchValue({
        seatsbooked: this.item.seatsbooked + selectedSeats,
        seats: this.item.seats - selectedSeats,
      });

      this.serv.bookmovie(this.bookticket.value, this.id,this.currentUser,this.numbseats).subscribe(data => {
        console.log(data);
        alert("Seat Booked");
        this.router.navigate(['movielist']);
      });
    } else {
      alert("Not enough available seats.");
    }
  }
}