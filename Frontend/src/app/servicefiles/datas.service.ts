import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient, public fb:FormBuilder) { }

  form: FormGroup = this.fb.group({
    name: [''],
    language: [''],
    category: [''],
    cast: [''],
    description: [''],
    rating: [''],
    seats: [''],
    price: [''],
    screen: [''],
    image: [null]
  })


  // Customer details
  getCus(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/viewcus');
  }
  deleteCus(userId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/delcus/${userId}`);
  }

  // Notications
  addmessage(data:any){
    return this.http.post<any>('http://localhost:3000/addmess',data);
  }
  delmessage(id:any){
    return this.http.delete(`http://localhost:3000/deletemess/${id}`)
  }
  viewmessage(){
    return this.http.get('http://localhost:3000/viewmess');
  }

  // Movie details
  addmovie(movie:any,profileImage:File):Observable<any>{
    let formData = new FormData();
    formData.append('name' , movie.name);
    formData.append('category' , movie.category);
    formData.append('language' , movie.language);
    formData.append('cast' , movie.cast);
    formData.append('description' , movie.description);
    formData.append('rating' , movie.rating);
    formData.append('seats' , movie.seats);
    formData.append('price' , movie.price);
    formData.append('screen' , movie.screen);
    formData.append('image' , movie.image);
    return this.http.post(`http://localhost:3000/addmovie` , formData)
  }
  getMovie(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/viewmovie');
  }
  getonemovie(id:any){
    return this.http.get(`http://localhost:3000/getonemovie/${id}`)
  }
  editmovie(updatedData:any,id:any){
    return this.http.put(`http://localhost:3000/editmovie/${id}`,updatedData)
  }
  delmovie(id:any){
    return this.http.delete(`http://localhost:3000/deletemovie/${id}`)
  }

  // Book movie
  bookmovie(updatedData:any,id:any,data1:any,data2:any){
    return this.http.put(`http://localhost:3000/bookmovie/${id}`,{updatedData,data1,data2})
  }

  // Get booked data
  getbookedmovies(user:any){
    return this.http.get(`http://localhost:3000/bookeddata?user=${user}`)
  }

  // cancel movie
  cancelmovie(id:any){
    return this.http.delete(`http://localhost:3000/cancelmovie/${id}`)
  }
}






