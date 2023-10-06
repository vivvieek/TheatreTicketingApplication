import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasService } from 'src/app/servicefiles/datas.service';

@Component({
  selector: 'app-moviedata',
  templateUrl: './moviedata.component.html',
  styleUrls: ['./moviedata.component.css']
})
export class MoviedataComponent implements OnInit{

  movie:any;

  constructor(
    private serv:DatasService, 
    private router:Router){}

  ngOnInit(): void {
    this.serv.getMovie().subscribe((data=>{
      this.movie=data;
      console.log(this.movie)
    }))
  }

  edititem(id:any){
      this.router.navigate(['editmovie/' + id]);
  }

  delmovie(id:any){
    this.serv.delmovie(id).subscribe(data=>console.log(data))
    alert('Data deleted')
    window.location.reload();
  }
}
