import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {ShoppingList} from "./model/shopping-list";
import {Item} from "./model/item";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingListService {

  private listsUrl = 'api/lists';
  private itemsUrl = 'api/items';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getShoppingLists(): Promise<ShoppingList[]> {
    return this.http.get(this.listsUrl)
      .toPromise()
      .then(response => response.json().data as ShoppingList[])
      .catch(this.handleError);
  }

  updateShoppingList(list: ShoppingList): Promise<void> {
    const url = `${this.listsUrl}/${list.id}`;
    return this.http
      .put(url, JSON.stringify(list), {headers: this.headers})
      .toPromise()
      .then(() => list)
      .catch(this.handleError);
  }

  addShoppingList(listName: string): Promise<ShoppingList> {
    return this.http
      .post(this.listsUrl, JSON.stringify({name: listName}), {headers: this.headers})
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  deleteShoppingList(id: number | string): Promise<void> {
    const url = `${this.listsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getItemsByListId(id: number): Promise<Item[]> {
    const url = this.itemsUrl + `?listId=${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Item[])
      .catch(this.handleError);
  }

  getItem(id: number): Promise<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Item)
      .catch(this.handleError);
  }

  addItem(id: number | string, name: string): Promise<Item> {
    return this.http
      .post(this.itemsUrl, JSON.stringify({name: name, listId: id}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  deleteItem(id: number | string): Promise<void> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  updateItem(item: Item): Promise<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http
      .put(url, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(() => item)
      .catch(this.handleError);
  }

  search(term: string, listId: number): Observable<Item[]> {
    const url = this.itemsUrl + `?listId=${listId}&name=${term}`;
    return this.http
      .get(url)
      .map(response => response.json().data as Item[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
