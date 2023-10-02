import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  constructor(private http:HttpClient) { }

  getCus(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/viewcus');
  }

  deleteCus(userId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/delcus/${userId}`);
  }

  addmessage(data:any){
    return this.http.post<any>('http://localhost:3000/addmess',data);
  }

  delmessage(id:any){
    return this.http.delete(`http://localhost:3000/deletemess/${id}`)
  }

  viewmessage(){
    return this.http.get('http://localhost:3000/viewmess');
  }

  addmovie(formData: FormData) {
    return this.http.post('http://localhost:3000/addmovie', formData);
  }

  getMovie() {
    return this.http.get('http://localhost:3000/viewmovie');
  }
}
