import { Component } from '@angular/core';
import { NotificationService } from 'src/app/servicefiles/notification.service';


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

  constructor(public serv:NotificationService){}

  ngOnInit():void{
    // this.fetchmessage();
  }

  submit() {
    // this.serv.addmessage(this.notification).subscribe(res => {
    //   alert('Message posted on homepage');
    //   this.notification = {
    //     notificationmess: ''
    //   };
    //   this.fetchmessage();
    // });
  }

  // delmess(id: any) {
  //   this.serv.delmessage(id).subscribe(data => console.log(data));
  //   alert('Message deleted');
  //   this.fetchmessage();
  // }

  // Get Messages
  // fetchmessage(): void {
  //   this.serv.viewmessage().subscribe(data => {
  //     this.notifications = data;
  //     console.log(this.notifications);
  //   });
  // }

}
