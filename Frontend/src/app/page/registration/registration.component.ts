import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { LoginService } from 'src/app/servicefiles/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  buttoncontrol=true;
  userdetail={
    name : '',
    email: '',
    password: '',
    repeatPassword:'',
    movieBooked: '',
    seatsBooked: '',
  }

  user={
    emailInput:'',
    passwordInput:''
  }

  constructor(private el: ElementRef, private router:Router, private serv:LoginService) {}

  ngOnInit() {
    const signUpButton = this.el.nativeElement.querySelector('#signUp');
    const signInButton = this.el.nativeElement.querySelector('#signIn');
    const container = this.el.nativeElement.querySelector('#container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  // Registration
  submit(){
    this.serv.adduser(this.userdetail).subscribe((res=>{
      alert("Registered Successfully. Now Please Login")
      window.location.reload();
    }))
  }

  // Login
  submit2(){
    this.serv.login(this.user).subscribe((res=>{
      alert("Login Successful")
      const newRoute = '';
      window.location.href = newRoute;
    }),
    (error=>{
      alert('Invalid credentials');
    }))
  }


}
