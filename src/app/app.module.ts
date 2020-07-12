import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{ RouterModule,Routes} from '@angular/router';

import{ HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';

import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { DisplaySearchComponent } from './display-search/display-search.component';


const page : Routes =[
                       {path:"dashboard", component:SearchPageComponent}
                     ];

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    DisplaySearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(page,{useHash:true}),
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxBootstrapSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
