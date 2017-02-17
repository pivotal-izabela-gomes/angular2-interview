import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {ListComponent} from "./list.component";
import {DebugElement, Injectable, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {ShoppingListService} from "../shopping-list.service";
import {FakeShoppingListService} from "../fake-shopping-list.service";
import {Observable} from "rxjs/Rx";
import {FormsModule} from "@angular/forms";
import {SpyLocation} from "@angular/common/testing";

let comp: ListComponent;
let fixture: ComponentFixture<ListComponent>;
let navSpy: jasmine.Spy;
let serviceSpy: jasmine.Spy;

describe('ListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Location, useClass: SpyLocation },
        { provide: ShoppingListService, useClass: FakeShoppingListService },
        { provide: ActivatedRoute, useValue: { 'params': Observable.of({ 'id': 1 }) } },
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ListComponent);
      comp = fixture.componentInstance;

      const location = TestBed.get(Location);
      const service = TestBed.get(ShoppingListService);
      navSpy = spyOn(location, 'back');
      serviceSpy = spyOn(service, 'addItem').and.callThrough();
    });
  }));

  it('should not have list items before ngOnInit', () => {
    expect(comp.items.length).toBe(0, 'should not have list items before ngOnInit');
  });

  it('should NOT have list items immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(comp.items.length).toBe(0,
      'should not have list items until service promise resolves');
  });

  describe('after get list items', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => fixture.detectChanges());
    }));

    it('should have list items', () => {
      expect(comp.items.length).toBeGreaterThan(0,
        'should have list items after service promise resolves');
    });

    it('should display list items', () => {
      const listItems = fixture.debugElement.queryAll(By.css('a'));
      expect(listItems.length).toBe(1, 'should display 1 list items');
    });

    it('should navigate to previous page when back button is clicked', () => {
      let button: DebugElement = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);

      expect(navSpy.calls.any()).toBe(true, 'location.back called');
    });

    it('should add new item on the list when add button is clicked', async(() => {
      const newItem = 'New Item';

      let input: DebugElement = fixture.debugElement.query(By.css('input'));
      input.nativeElement.value = newItem;

      let buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('button'));
      buttons[1].triggerEventHandler('click', null);

      expect(serviceSpy.calls.any()).toBe(true, 'service.addItem called');

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(comp.items[1].name).toBe(newItem,
          'should have the new item added to the list');

        expect(comp.items.length).toBe(2,
          'should have 2 list items after adding the new one');

        const listItems = fixture.debugElement.queryAll(By.css('a'));
        expect(listItems.length).toBe(2, 'should display 2 list items');
      });
    }));
  });
});
