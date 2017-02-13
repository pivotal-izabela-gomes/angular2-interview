import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";
import {AppRoutingModule} from "./app-routing.module";
import {HomepageComponent} from "./homepage/homepage.component";
import {ShoppingListService} from "./shopping-list.service";
import {HttpModule} from "@angular/http";
import {APP_BASE_HREF} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  providers: [
    ShoppingListService,
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
