import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { MovielistComponent } from './page/movielist/movielist.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { AddmovieComponent } from './page/adminpages/moviesdata/addmovie/addmovie.component';
import { MoviedataComponent } from './page/adminpages/moviesdata/moviedata/moviedata.component';
import { EditmovieComponent } from './page/adminpages/moviesdata/editmovie/editmovie.component';
import { CustomeraccountComponent } from './page/customerpages/customeraccount/customeraccount.component';
import { BookingpageComponent } from './page/customerpages/bookingpage/bookingpage.component';
import { CustomerdataComponent } from './page/adminpages/customerdata/customerdata.component';
import { OffersComponent } from './page/adminpages/offers/offers.component';
import { RatingComponent } from './page/customerpages/rating/rating.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovielistComponent,
    RegistrationComponent,
    AddmovieComponent,
    MoviedataComponent,
    EditmovieComponent,
    CustomeraccountComponent,
    BookingpageComponent,
    CustomerdataComponent,
    OffersComponent,
    RatingComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
