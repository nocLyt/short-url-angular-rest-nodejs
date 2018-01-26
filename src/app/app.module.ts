import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { UrlService } from './service/url.service';
import { Four04Component } from './four04/four04.component';
import { AppRoutingModule } from './/app-routing.module';


//---- For in-memorywebapi
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './service/in-memory-data.service';
//----


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    Four04Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    AppRoutingModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [UrlService,
    // InMemoryDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
