import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token=localStorage.getItem('token');
    let tokenizedrequest=req.clone({
      setHeaders:{Authorization:'Bearer '+token}
    })
    return next.handle(tokenizedrequest);
  }
}
