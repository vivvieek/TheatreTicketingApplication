import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './page/registration/registration.component';
import { MovielistComponent } from './component/movielist/movielist.component';
import { MoviedataComponent } from './page/moviedata/moviedata.component';
import { EditmovieComponent } from './page/editmovie/editmovie.component';
import { CustomerdataComponent } from './page/customerdata/customerdata.component';
import { CustomeraccountComponent } from './page/customeraccount/customeraccount.component';
import { BookingpageComponent } from './page/bookingpage/bookingpage.component';
import { AddmovieComponent } from './page/addmovie/addmovie.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

const routes: Routes = [
  {path:'',component:MovielistComponent},
  {path:'login',component:RegistrationComponent},
  {path:'movielist',component:MoviedataComponent},
  {path:'editmovie',component:EditmovieComponent},
  {path:'customerdata',component:CustomerdataComponent},
  {path:'customeracc',component:CustomeraccountComponent},
  {path:'booking',component:BookingpageComponent},
  {path:'addmovie',component:AddmovieComponent},

  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
