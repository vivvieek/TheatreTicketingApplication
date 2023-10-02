import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DatasService } from 'src/app/servicefiles/datas.service';

@Component({
  selector: 'app-moviedata',
  templateUrl: './moviedata.component.html',
  styleUrls: ['./moviedata.component.css']
})
export class MoviedataComponent implements OnInit{

  movie:any;

  constructor(private serv:DatasService){}

  ngOnInit(): void {
    this.serv.getMovie().subscribe((data=>{
      this.movie=data;
      console.log(this.movie)
    }))
  }

}
