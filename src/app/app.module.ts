import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppRoutingModule} from "./app-routing.module";

import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";

import { AppComponent }  from './app.component';
import {HomepageComponent} from "./homepage/homepage.component";
import {ShoppingListService} from "./shopping-list.service";
import {APP_BASE_HREF} from "@angular/common";
import {ListComponent} from "./list/list.component";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [
    AppComponent,
    HomepageComponent,
    ListComponent,
  ],
  providers: [
    ShoppingListService,
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
