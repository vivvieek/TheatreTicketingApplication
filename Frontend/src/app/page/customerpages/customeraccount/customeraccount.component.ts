import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/servicefiles/datas.service';

@Component({
  selector: 'app-customeraccount',
  templateUrl: './customeraccount.component.html',
  styleUrls: ['./customeraccount.component.css']
})
export class CustomeraccountComponent implements OnInit {

  users:any[]=[];

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
  }
}
