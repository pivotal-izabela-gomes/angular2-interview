import {ShoppingList} from "./model/shopping-list";
import {ShoppingListService} from "./shopping-list.service";
import {Item} from "./model/item";

export var LISTS: ShoppingList[] = [
  { id: 1, name: 'Grocery List', items:[] },
  { id: 2, name: 'Butcher List', items:[] },
  { id: 3, name: 'Pharmacy List', items:[] }
];

export class FakeShoppingListService extends ShoppingListService {
  lists = LISTS.map(l => this.clone(l.id, l.name, l.items));
  lastPromise: Promise<any>;  // remember so we can spy on promise calls

  getLists(): Promise<ShoppingList[]> {
    return this.lastPromise = Promise.resolve<ShoppingList[]>(this.lists);
  }

  clone(id: number, name: string, items: Item[]) { return {id: id, name: name, items: items}; }
}
