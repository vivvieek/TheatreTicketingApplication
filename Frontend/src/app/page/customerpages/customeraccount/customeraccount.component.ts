import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/servicefiles/datas.service';
import { LoginService } from 'src/app/servicefiles/login.service';

@Component({
  selector: 'app-customeraccount',
  templateUrl: './customeraccount.component.html',
  styleUrls: ['./customeraccount.component.css']
})
export class CustomeraccountComponent implements OnInit {

  currentUser:any;
  item:any;

  constructor(private serv:DatasService, private serv2:LoginService){}


  ngOnInit(): void {
    this.currentUser=this.serv2.getUser();
    console.log(this.currentUser)
    this.moviesbooked();
  }

  moviesbooked(){
    this.serv.getbookedmovies(this.currentUser).subscribe((data)=>{
    this.item=data
    console.log(this.item)
    })
  }

  cancel(id:any){
    this.serv.cancelmovie(id).subscribe(data=>console.log(data))
    alert('Movie cancelled')
    this.moviesbooked();
  }



}
