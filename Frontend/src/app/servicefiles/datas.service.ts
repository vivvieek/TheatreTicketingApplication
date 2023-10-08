import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  server_address:string='api';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }

  // view details
  getCus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.server_address}/viewcus`);
  }
  // delete customer
  deleteCus(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.server_address}/delcus/${userId}`);
  }
  // Add notification
  addmessage(data:any){
    return this.http.post<any>(`${this.server_address}/addmess`,data);
  }
  // Delete notification
  delmessage(id:any){
    return this.http.delete(`${this.server_address}/deletemess/${id}`)
  }
  // View notification
  viewmessage(){
    return this.http.get(`${this.server_address}/viewmess`);
  }
  // Add movie
  addmovie(formData:any):Observable<any>{
    return this.http.post(`${this.server_address}/addmovie` , formData)
  }
  // Get all movie
  getMovie(): Observable<any[]> {
    return this.http.get<any[]>(`${this.server_address}/viewmovie`);
  }
  // Get one movie
  getonemovie(id:any){
    return this.http.get(`${this.server_address}/getonemovie/${id}`)
  }
  // Edit movie
  editmovie(updatedData:any,id:any){
    return this.http.put(`${this.server_address}/editmovie/${id}`,updatedData)
  }
  // Delete movie
  delmovie(id:any){
    return this.http.delete(`${this.server_address}/deletemovie/${id}`)
  }
  // Book movie
  bookmovie(updatedData:any,id:any,data1:any,data2:any, data3:any){
    return this.http.put(`${this.server_address}/bookmovie/${id}`,{updatedData,data1,data2,data3})
  }
  // Get booked data
  getbookedmovies(user:any){
    return this.http.get(`${this.server_address}/bookeddata?user=${user}`)
  }
  // cancel movie
  cancelmovie(id:any){
    return this.http.delete(`${this.server_address}/cancelmovie/${id}`)
  }
  // Add review
  addreview(data1:any, data2:any, data3:any){
    return this.http.post<any>(`${this.server_address}/addreview`,{data1,data2, data3});
  }
  // View rating
  getrating(){
    return this.http.get(`${this.server_address}/getrating`);
  }
  // Delete review
  delreview(id:any){
    return this.http.delete(`${this.server_address}/deleterating/${id}`)
  }
}




