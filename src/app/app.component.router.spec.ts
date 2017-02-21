import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "./app.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {Router, RouterLinkWithHref} from "@angular/router";
import {SpyLocation} from "@angular/common/testing";
import {NO_ERRORS_SCHEMA, DebugElement} from "@angular/core";
import {AppModule} from "./app.module";
import {Location} from '@angular/common';
import {By} from "@angular/platform-browser";
import {ShoppingListService} from "./shopping-list.service";
import {FakeShoppingListService} from "./fake-shopping-list.service";
import {ListComponent} from "./list/list.component";
import {AppRoutingModule} from "./app-routing.module";
import {ItemComponent} from "./item/item.component";

let comp:     AppComponent;
let fixture:  ComponentFixture<AppComponent>;
let router:   Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [
        AppComponent,
        HomepageComponent,
        ListComponent,
        ItemComponent
      ],
      providers: [{provide: ShoppingListService, useClass: FakeShoppingListService}]
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
