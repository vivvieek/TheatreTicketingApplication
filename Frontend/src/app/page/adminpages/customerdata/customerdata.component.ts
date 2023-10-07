import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/servicefiles/datas.service';

@Component({
  selector: 'app-customerdata',
  templateUrl: './customerdata.component.html',
  styleUrls: ['./customerdata.component.css']
})
export class CustomerdataComponent implements OnInit {

  users:any[]=[];
  rating:any;

  constructor(private serv:DatasService){}

  ngOnInit(): void {
    this.fetchCus();
  }

  fetchCus(): void {
    this.serv.getCus().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
      }
    );

    this.serv.getrating().subscribe(
      (rating)=>{
        this.rating =rating;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  deleteUser(userId: string): void {
    this.serv.deleteCus(userId).subscribe(() => {
        this.fetchCus();
        alert('User Deleted');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleterating(userId: string): void {
    this.serv.delreview(userId).subscribe(() => {
        this.fetchCus();
        alert('Review Deleted');
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
