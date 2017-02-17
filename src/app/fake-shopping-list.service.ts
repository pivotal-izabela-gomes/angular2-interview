import {ShoppingList} from "./model/shopping-list";
import {ShoppingListService} from "./shopping-list.service";

export var LISTS: ShoppingList[] = [
  { id: 1, name: 'Grocery List'},
  { id: 2, name: 'Butcher List'},
  { id: 3, name: 'Pharmacy List'}
];

export class FakeShoppingListService extends ShoppingListService {
  lists = LISTS.map(l => this.clone(l.id, l.name));
  lastPromise: Promise<any>;  // remember so we can spy on promise calls

  getShoppingLists(): Promise<ShoppingList[]> {
    return this.lastPromise = Promise.resolve<ShoppingList[]>(this.lists);
  }

  clone(id: number, name: string) { return {id: id, name: name}; }
}
