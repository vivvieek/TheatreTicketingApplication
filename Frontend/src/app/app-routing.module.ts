import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

import { RegistrationComponent } from './page/registration/registration.component';
import { MovielistComponent } from './page/movielist/movielist.component';
import { MoviedataComponent } from './page/adminpages/moviesdata/moviedata/moviedata.component';
import { EditmovieComponent } from './page/adminpages/moviesdata/editmovie/editmovie.component';
import { CustomerdataComponent } from './page/adminpages/customerdata/customerdata.component';
import { CustomeraccountComponent } from './page/customerpages/customeraccount/customeraccount.component';
import { BookingpageComponent } from './page/customerpages/bookingpage/bookingpage.component';
import { AddmovieComponent } from './page/adminpages/moviesdata/addmovie/addmovie.component';
import { OffersComponent } from './page/adminpages/offers/offers.component';
import { RatingComponent } from './page/customerpages/rating/rating.component';
import { RoleGuard } from './servicefiles/auth.guard';
import { ErrorComponent } from './page/error/error.component';

const routes: Routes = [
  {path:'',component:MovielistComponent},
  {path:'login',component:RegistrationComponent},
  {path:'movielist', component:MoviedataComponent,canActivate: [RoleGuard],data: {roles: 'admin'}},
  
  {path:'editmovie/:id',component:EditmovieComponent,canActivate: [RoleGuard],data: {roles: 'admin'}},
  {path:'customerdata',component:CustomerdataComponent,canActivate: [RoleGuard],data: {roles: 'admin'}},
  {path:'customeracc',component:CustomeraccountComponent,canActivate: [RoleGuard],data: {roles: 'customer'}},
  {path:'booking/:id',component:BookingpageComponent,canActivate: [RoleGuard],data: {roles: 'customer'}},
  {path:'addmovie',component:AddmovieComponent,canActivate: [RoleGuard],data: {roles: 'admin'}},
  {path:'offers',component:OffersComponent,canActivate: [RoleGuard],data: {roles: 'admin'}},
  {path:'rate/:id',component:RatingComponent,canActivate: [RoleGuard],data: {roles: 'customer'}},

  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent},

  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
