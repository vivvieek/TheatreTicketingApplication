import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasService } from 'src/app/servicefiles/datas.service';
import { LoginService } from 'src/app/servicefiles/login.service';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit{

  movie: any[] = [];

  iscustomer=true;
  isadmin=true;

  constructor(
    private serv:DatasService, 
    private serv2:LoginService, 
    private router:Router){}

  user:any;

  ngOnInit(): void {
    this.serv.getMovie().subscribe(
      (data) => {
        this.movie = data;
        console.log(this.movie)
      },
      (error) => {
        console.error(error);
      }
    );
    this.user=this.serv2.getRole();
    this.visibility();
  }

  visibility(){
    if(this.user==='customer'){
      this.isadmin=false;
      this.iscustomer=true;
    }
    else if(this.user==='admin'){
      this.isadmin=true;
      this.iscustomer=false;
    }
    else{
      this.isadmin=false;
      this.iscustomer=true;
    }
  }

  Book(id:any){
    if(this.user==='customer'){
      this.router.navigate(['booking/'+id]);
    }
    else if(this.user==='admin'){
      this.router.navigate(['movielist']);
    }
    else{
      this.router.navigate(['login']);
    }
  }

  Rate(id:any){
    if(this.user==='customer'){
      this.router.navigate(['rate/'+id]);
    }
    else if(this.user==='admin'){
      this.router.navigate(['movielist']);
    }
    else{
      this.router.navigate(['login']);
    }
  }

}