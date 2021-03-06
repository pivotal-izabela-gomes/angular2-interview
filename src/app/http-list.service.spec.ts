import {
  async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import {ShoppingList} from "./model/shopping-list";
import {ShoppingListService} from "./shopping-list.service";

const makeListData = () => [
  { id: 1, name: 'Grocery List' },
  { id: 2, name: 'Butcher List' },
  { id: 3, name: 'Pharmacy List' }
] as ShoppingList[];

describe('Http-ShoppingListService (mockBackend)', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        ShoppingListService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
      .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([ShoppingListService], (service: ShoppingListService) => {
      expect(service instanceof ShoppingListService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new ShoppingListService(http);
    expect(service instanceof ShoppingListService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when getLists', () => {
    let backend: MockBackend;
    let service: ShoppingListService;
    let fakeLists: ShoppingList[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new ShoppingListService(http);
      fakeLists = makeListData();
      let options = new ResponseOptions({status: 200, body: {data: fakeLists}});
      response = new Response(options);
    }));

    it('should have expected fake lists (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getShoppingLists()
        .then(lists => {
          expect(lists.length).toBe(fakeLists.length,
            'should have expected no. of shopping lists');
        });
    })));

    it('should be OK returning no lists', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getShoppingLists()
        .then(lists => {
          expect(lists.length).toBe(0, 'should have no lists');
        });
    })));
  });
});
