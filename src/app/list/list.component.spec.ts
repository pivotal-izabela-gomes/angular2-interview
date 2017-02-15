import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {ListComponent} from "./list.component";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Location} from '@angular/common';
import {SpyLocation} from "@angular/common/testing";

let comp: ListComponent;
let fixture: ComponentFixture<ListComponent>;
let navSpy: jasmine.Spy;

describe('ListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        {provide: Location, useClass: SpyLocation},
        ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ListComponent);
      comp = fixture.componentInstance;

      const location = TestBed.get(Location);
      this.navSpy = spyOn(location, 'back');
    });
  }));

  it('should navigate to previous page when back button is clicked', () => {
    let button: DebugElement;

    button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.whenStable().then(() => {
      expect(navSpy.calls.any()).toBe(true, 'location.back called');
    });
  });
});
