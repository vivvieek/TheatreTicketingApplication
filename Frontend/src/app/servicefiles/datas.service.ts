import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  private apiUrl = 'http://localhost:3000'

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }


  // view details
  getCus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/viewcus`);
  }
  // delete customer
  deleteCus(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delcus/${userId}`);
  }

  // Add notification
  addmessage(data:any){
    return this.http.post<any>(`${this.apiUrl}/addmess`,data);
  }
  // Delete notification
  delmessage(id:any){
    return this.http.delete(`${this.apiUrl}/deletemess/${id}`)
  }
  // View notification
  viewmessage(){
    return this.http.get(`${this.apiUrl}/viewmess`);
  }

  // Add movie
  addmovie(formData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/addmovie` , formData)
  }

  // Get all movie
  getMovie(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/viewmovie`);
  }
  // Get one movie
  getonemovie(id:any){
    return this.http.get(`${this.apiUrl}/getonemovie/${id}`)
  }
  // Edit movie
  editmovie(updatedData:any,id:any){
    return this.http.put(`${this.apiUrl}/editmovie/${id}`,updatedData)
  }
  // Delete movie
  delmovie(id:any){
    return this.http.delete(`${this.apiUrl}/deletemovie/${id}`)
  }
  // Book movie
  bookmovie(updatedData:any,id:any,data1:any,data2:any){
    return this.http.put(`${this.apiUrl}/bookmovie/${id}`,{updatedData,data1,data2})
  }
  // Get booked data
  getbookedmovies(user:any){
    return this.http.get(`${this.apiUrl}/bookeddata?user=${user}`)
  }
  // cancel movie
  cancelmovie(id:any){
    return this.http.delete(`${this.apiUrl}/cancelmovie/${id}`)
  }
  // Add review
  addreview(data1:any, data2:any, data3:any){
    return this.http.post<any>(`${this.apiUrl}/addreview`,{data1,data2, data3});
  }
  // View rating
  getrating(){
    return this.http.get(`${this.apiUrl}/getrating`);
  }
  // Delete review
  delreview(id:any){
    return this.http.delete(`${this.apiUrl}/deleterating/${id}`)
  }
}




