import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { MovielistComponent } from './component/movielist/movielist.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { AddmovieComponent } from './page/addmovie/addmovie.component';
import { MoviedataComponent } from './page/moviedata/moviedata.component';
import { EditmovieComponent } from './page/editmovie/editmovie.component';
import { CustomeraccountComponent } from './page/customeraccount/customeraccount.component';
import { BookingpageComponent } from './page/bookingpage/bookingpage.component';
import { CustomerdataComponent } from './page/customerdata/customerdata.component';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
