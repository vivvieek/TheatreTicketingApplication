import { Component } from '@angular/core';
import { DatasService } from 'src/app/servicefiles/datas.service';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {


  notification={
    notificationmess:''
  };

  notifications:any;

  constructor(public serv:DatasService){}

  ngOnInit():void{
    this.fetchmessage();
  }

  submit() {
    this.serv.addmessage(this.notification).subscribe(res => {
      alert('Notification Posted');
      this.notification = {
        notificationmess: ''
      };
      window.location.reload();
      this.fetchmessage();
    });
  }

  delmess(id: any) {
    this.serv.delmessage(id).subscribe(data => console.log(data));
    alert('Notification deleted');
    window.location.reload();
    this.fetchmessage();
  }

  fetchmessage(): void {
    this.serv.viewmessage().subscribe(data => {
      this.notifications = data;
    });
  }

}
