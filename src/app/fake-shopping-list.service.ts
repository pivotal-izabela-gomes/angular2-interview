import {ShoppingList} from "./model/shopping-list";
import {ShoppingListService} from "./shopping-list.service";
import {Item} from "./model/item";

export var LISTS: ShoppingList[] = [
  { id: 1, name: 'Grocery List'},
  { id: 2, name: 'Butcher List'},
  { id: 3, name: 'Pharmacy List'}
];

export var ITEMS: Item[] = [
  { id: 1, name: 'Bread', listId: 1 }
];

export class FakeShoppingListService extends ShoppingListService {
  lists = LISTS.map(l => this.clone(l.id, l.name));
  items = ITEMS.map(i => this.cloneItem(i.id, i.name, i.listId));
  lastPromise: Promise<any>;  // remember so we can spy on promise calls

  getShoppingLists(): Promise<ShoppingList[]> {
    return this.lastPromise = Promise.resolve<ShoppingList[]>(this.lists);
  }

  getItemsByListId(id: number | string): Promise<Item[]> {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    let list = this.items.filter(i => i.listId === id);
    return this.lastPromise = Promise.resolve(list);
  }

  addItem(id: number | string, name: string): Promise<Item> {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    let list = this.lists.find(l => l.id === id);

    if (list != null) {
      let newItem = { id: this.items.length + 1, name: name, listId: +id };
      this.items.push(newItem);
      return this.lastPromise = Promise.resolve(newItem);
    } else {
      return Promise.resolve(null);
    }
  }

  clone(id: number, name: string) { return {id: id, name: name}; }
  cloneItem(id: number, name: string, listId: number) { return {id: id, name: name, listId: listId}; }
}
