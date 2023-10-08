import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate{

  constructor(private serv:LoginService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const userRole = this.serv.getRole();

    if(route.data['roles'].includes(userRole)){
      return true;
    } else if (!userRole){
      this.router.navigate(['**']);
      alert('Access Denied');
      return false;
    } else {
      this.router.navigate(['**']);
      alert('Access Denied');
      return false;
    }
  }
}