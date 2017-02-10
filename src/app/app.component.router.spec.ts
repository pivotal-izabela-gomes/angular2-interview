import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "./app.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {Router} from "@angular/router";
import {SpyLocation} from "@angular/common/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppModule} from "./app.module";
import {Location} from '@angular/common';
import {By} from "@angular/platform-browser";

let comp:     AppComponent;
let fixture:  ComponentFixture<AppComponent>;
let router:   Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
      .compileComponents();
  }));

  it('should navigate to "Homepage" immediately', () => {

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    const injector = fixture.debugElement.injector;
    location = injector.get(Location);
    router = injector.get(Router);
    router.initialNavigation();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(location.path()).toEqual('/homepage', 'after initialNavigation()');

      const el = fixture.debugElement.query(By.directive(HomepageComponent));
      expect(el).toBeTruthy('expected an element for ' + HomepageComponent.name);
    });
  });
});
