import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreviousComponent } from './previous/previous.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http'; // for fetching api
import { StoreModule } from '@ngrx/store';
import { cartReducer } from 'src/Store/cart-reducer';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    PreviousComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ cart: cartReducer }),
    // EffectsModule.forRoot([CartEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
