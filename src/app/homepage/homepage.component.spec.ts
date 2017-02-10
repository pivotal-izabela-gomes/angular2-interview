import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {HomepageComponent} from "./homepage.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ListService} from "../list.service";
import {FakeShoppingListService} from "../fake-shopping-list.service";
import {By} from "@angular/platform-browser";

let comp: HomepageComponent;
let fixture: ComponentFixture<HomepageComponent>;

describe('HomepageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: ListService, useClass: FakeShoppingListService}]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomepageComponent);
      comp = fixture.componentInstance;
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

    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => fixture.detectChanges());
    }));

    it('should have shoppingLists', () => {
      expect(comp.lists.length).toBeGreaterThan(0,
        'should have shoppingLists after service promise resolves');
    });

    it('should DISPLAY shoppingLists', () => {
      const shoppingLists = fixture.debugElement.queryAll(By.css('a'));
      expect(shoppingLists.length).toBe(3, 'should display 3 shoppingLists');
    });
  })

})

