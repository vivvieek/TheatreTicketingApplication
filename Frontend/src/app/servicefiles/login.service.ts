import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import jwtDecode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient) { }

  // Registration
  adduser(data:any){
    return this.http.post<any>('http://localhost:3000/adduser',data);
  }

  // Login
  login(data:any){
    return this.http.post<any>('http://localhost:3000/login',data).pipe(
      tap((res)=>{
        if(res.token){
          localStorage.setItem('token',res.token);
        }
      })
    );
  }

  // Get role of person
  getRole():string|null{
    const token=localStorage.getItem('token');
    if(token){
      const decodedToken:any=jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  }

  getUser():string|null{
    const token=localStorage.getItem('token');
    if(token){
      const decodedToken:any=jwtDecode(token);
      return decodedToken.email;
    }
    return null;
  }
}
