import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/servicefiles/scroll.service';
import { LoginService } from 'src/app/servicefiles/login.service';
import { DatasService } from 'src/app/servicefiles/datas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  notification:any;

  isAdmin=false;
  isCustomer=false;
  isSignin=true;
  isSignout=false;
  currentUser:any;

  constructor(
    private scrollService: ScrollService,
    private serv:LoginService, 
    private serv2:DatasService) {}

  scrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 50) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }

  scrollToBottom() {
    this.scrollService.scrollToBottom();
  }

  ngOnInit(): void {
    this.currentUser=this.serv.getRole();

    this.navDisplay();

    this.serv2.viewmessage().subscribe((data=>{
      this.notification=data;
      console.log(this.notification)
    }))
  }

  navDisplay(){
    if(this.currentUser==='admin'){
      this.isAdmin=true;
      this.isSignin=false;
      this.isSignout=true;
    }
    else if(this.currentUser==='customer'){
      this.isCustomer=true;
      this.isSignin=false;
      this.isSignout=true;
    }
    else{
      this.isAdmin=false;
      this.isCustomer=false;
      this.isSignin=true;
      this.isSignout=false;
    }
  }

  logOut(){
    alert("Logged Out")
    const newRoute = '';
    window.location.href = newRoute;
    localStorage.clear()
  }

}