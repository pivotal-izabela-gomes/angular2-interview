import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";
import {AppRoutingModule} from "./app-routing.module";
import {HomepageComponent} from "./homepage/homepage.component";
import {ListService} from "./list.service";
import {HttpModule} from "@angular/http";
import {APP_BASE_HREF} from "@angular/common";

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  providers: [
    ListService,
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
