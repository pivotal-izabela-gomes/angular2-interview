import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {ItemComponent} from "./item.component";
import {FakeShoppingListService} from "../fake-shopping-list.service";
import {ShoppingListService} from "../shopping-list.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {By} from "@angular/platform-browser";


let comp: ItemComponent;
let fixture: ComponentFixture<ItemComponent>;

describe('ItemComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [FormsModule],
      declarations: [ItemComponent],
      // schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ShoppingListService, useClass: FakeShoppingListService},
        { provide: ActivatedRoute, useValue: { 'params': Observable.of({ 'id': 1 }) } },
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ItemComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should not have list items before ngOnInit', () => {
    expect(comp.item).toBeUndefined('should not have list items before ngOnInit');
  });

  it('should NOT have list items immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(comp.item).toBeUndefined('should not have list items until service promise resolves');
  });

  describe('after get item details', () => {

    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => fixture.detectChanges());
    }));

    it('should have item details', () => {
      expect(comp.item.name).toBe('Bread',
        'should have list items after service promise resolves');
    });

    it('should display item name and id', () => {
      const name = fixture.debugElement.query(By.css('.name'));
      expect(name.nativeElement.textContent).toBe('Bread', 'should display item name');

      const id = fixture.debugElement.query(By.css('.id'));
      expect(id.nativeElement.textContent).toBe('1', 'should display item id');
    });
  });
});
