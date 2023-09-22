import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './page/registration/registration.component';
import { MovielistComponent } from './page/movielist/movielist.component';
import { MoviedataComponent } from './page/adminpages/moviesdata/moviedata/moviedata.component';
import { EditmovieComponent } from './page/adminpages/moviesdata/editmovie/editmovie.component';
import { CustomerdataComponent } from './page/adminpages/customerdata/customerdata.component';
import { CustomeraccountComponent } from './page/customerpages/customeraccount/customeraccount.component';
import { BookingpageComponent } from './page/customerpages/bookingpage/bookingpage.component';
import { AddmovieComponent } from './page/adminpages/moviesdata/addmovie/addmovie.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { OffersComponent } from './page/adminpages/offers/offers.component';
import { RatingComponent } from './page/customerpages/rating/rating.component';

const routes: Routes = [
  {path:'',component:MovielistComponent},
  {path:'login',component:RegistrationComponent},
  {path:'movielist',component:MoviedataComponent},
  {path:'editmovie',component:EditmovieComponent},
  {path:'customerdata',component:CustomerdataComponent},
  {path:'customeracc',component:CustomeraccountComponent},
  {path:'booking',component:BookingpageComponent},
  {path:'addmovie',component:AddmovieComponent},
  {path:'offers',component:OffersComponent},
  {path:'rate',component:RatingComponent},

  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
