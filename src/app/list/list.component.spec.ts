import {TestBed, ComponentFixture, async, fakeAsync, tick} from "@angular/core/testing";
import {ListComponent} from "./list.component";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {ShoppingListService} from "../shopping-list.service";
import {FakeShoppingListService} from "../fake-shopping-list.service";
import {Observable} from "rxjs/Observable";
import {FormsModule} from "@angular/forms";
import {SpyLocation} from "@angular/common/testing";
import {RouterLinkStubDirective} from "../homepage/homepage.component.spec";

let comp: ListComponent;
let fixture: ComponentFixture<ListComponent>;
let navSpy: jasmine.Spy;
let serviceSaveNameSpy: jasmine.Spy;
let serviceAddSpy: jasmine.Spy;
let serviceDeleteSpy: jasmine.Spy;

describe('ListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ListComponent, RouterLinkStubDirective],
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
      serviceSaveNameSpy = spyOn(service, 'updateShoppingList').and.callThrough();
      serviceAddSpy = spyOn(service, 'addItem').and.callThrough();
      serviceDeleteSpy = spyOn(service, 'deleteItem').and.callThrough();
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
    const newItem = 'New Item';

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
      let input: DebugElement = fixture.debugElement.query(By.css('.new-item'));
      input.nativeElement.value = newItem;

      let buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('.add'));
      buttons[0].triggerEventHandler('click', null);

      expect(serviceAddSpy.calls.any()).toBe(true, 'service.addItem called');

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

    it('should delete item from list when delete button is clicked', async(() => {
      let buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('.delete'));
      buttons[0].triggerEventHandler('click', null);

      expect(serviceDeleteSpy.calls.any()).toBe(true, 'service.deleteItem called');

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(comp.items.length).toBe(0,
          'should have 0 list items after deleting the first one');

        const listItems = fixture.debugElement.queryAll(By.css('a'));
        expect(listItems.length).toBe(0, 'should not display any list items');
      });
    }));

    it('should tell ROUTER to navigate when item clicked', () => {
      let links: RouterLinkStubDirective[];
      let linkDes: DebugElement[];

      linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
      links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

      const itemsLinkDe = linkDes[0];
      const itemsLink = links[0];

      expect(itemsLink.navigatedTo).toBeNull('link should not have navigated yet');

      itemsLinkDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(itemsLink.navigatedTo[0]).toBe("/item");
      expect(itemsLink.navigatedTo[1]).toBe(1);

    });

    it('should save new list name when enter is pressed', async(() => {
      let newName = 'New List Name';
      const label = fixture.debugElement.query(By.css('.list-name-display'));
      label.triggerEventHandler('click', null);
      fixture.detectChanges();

      let input: DebugElement = fixture.debugElement.query(By.css('.list-name'));
      input.nativeElement.value = newName;

      let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
      evt.initCustomEvent('input', false, false, null);

      input.nativeElement.dispatchEvent(evt); // tell Angular

      input.triggerEventHandler('keydown.enter', null);
      expect(serviceSaveNameSpy.calls.any()).toBe(true, 'service.saveName called');

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(comp.list.name).toBe(newName, 'should have the new list name');

        const label = fixture.debugElement.query(By.css('.list-name-display'));
        expect(label.nativeElement.textContent).toBe(newName, 'should display the new list name');
      });
    }));
  });
});

describe('ListComponent - Search', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ListComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Location, useClass: SpyLocation },
        { provide: ShoppingListService, useClass: FakeShoppingListService },
        { provide: ActivatedRoute, useValue: { 'params': Observable.of({ 'id': 2 }) } },
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ListComponent);
      comp = fixture.componentInstance;
    });
  }));

  beforeEach(async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => fixture.detectChanges());
  }));

  it('should search for items in the list', fakeAsync(()=> {
    let input: DebugElement = fixture.debugElement.query(By.css('.search-box'));
    input.nativeElement.value = 'Mil';

    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent('input', false, false, null);

    input.nativeElement.dispatchEvent(evt); // tell Angular

    input.triggerEventHandler('keyup', null);

    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    let searchResults: DebugElement[] = fixture.debugElement.queryAll(By.css('.search-result'));
    expect(searchResults.length).toBe(1, 'should find 1 element in search');
    expect(searchResults[0].nativeElement.textContent).toContain('Milk', 'should find Milk in search');
  }));
});
