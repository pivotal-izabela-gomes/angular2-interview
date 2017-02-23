import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {HomepageComponent} from "./homepage.component";
import {NO_ERRORS_SCHEMA, DebugElement, Directive, Input} from "@angular/core";
import {ShoppingListService} from "../shopping-list.service";
import {FakeShoppingListService} from "../fake-shopping-list.service";
import {By} from "@angular/platform-browser";

let comp: HomepageComponent;
let fixture: ComponentFixture<HomepageComponent>;
let serviceDeleteSpy: jasmine.Spy;

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HomepageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: ShoppingListService, useClass: FakeShoppingListService}]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomepageComponent);
      comp = fixture.componentInstance;

      let service = TestBed.get(ShoppingListService);
      serviceDeleteSpy = spyOn(service, 'deleteShoppingList').and.callThrough();
    })
  }));

  it('should not have shoppingLists before ngOnInit', () => {
    expect(comp.lists.length).toBe(0, 'should not have shoppingLists before ngOnInit');
  });

  it('should NOT have shoppingLists immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(comp.lists.length).toBe(0,
      'should not have shoppingLists until service promise resolves');
  });

  describe('after get shoppingLists', () => {
    let links: RouterLinkStubDirective[];
    let linkDes: DebugElement[];

    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => fixture.detectChanges());
    }));

    it('should have shoppingLists', () => {
      expect(comp.lists.length).toBeGreaterThan(0,
        'should have shoppingLists after service promise resolves');
    });

    it('should display shoppingLists', () => {
      const shoppingLists = fixture.debugElement.queryAll(By.css('a'));
      expect(shoppingLists.length).toBe(3, 'should display 3 shoppingLists');
    });

    it('should tell ROUTER to navigate when list clicked', () => {
      linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
      links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

      const listsLinkDe = linkDes[0];
      const listsLink = links[0];

      expect(listsLink.navigatedTo).toBeNull('link should not have navigated yet');

      listsLinkDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(listsLink.navigatedTo[0]).toBe("/list");
      expect(listsLink.navigatedTo[1]).toBe(1);

    });

    it('should add new list when add button is clicked', () => {
      let newListName = 'My New List';
      let input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.value = newListName;

      let addButton = fixture.debugElement.query(By.css('.add'));
      addButton.triggerEventHandler('click', null);

      expect(comp.lists.length).toBe(4, 'homepage should have 4 lists');
      expect(comp.lists[3].name).toBe(newListName, 'homepage should have the new list');

      fixture.detectChanges();

      const shoppingLists = fixture.debugElement.queryAll(By.css('a'));
      expect(shoppingLists.length).toBe(4, 'should display 4 shoppingLists');
    });

    it('should remove list when delete button is clicked', () => {
      let deleteButton = fixture.debugElement.queryAll(By.css('.delete'));
      deleteButton[0].triggerEventHandler('click', null);

      expect(serviceDeleteSpy.calls.any()).toBe(true, 'service.deleteShoppingList called');

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(comp.lists.length).toBe(2, 'should have 2 lists after deleting one');

        const shoppingLists = fixture.debugElement.queryAll(By.css('a'));
        expect(shoppingLists.length).toBe(2, 'should display 2 shoppingLists');
      });
    });
  });
});

