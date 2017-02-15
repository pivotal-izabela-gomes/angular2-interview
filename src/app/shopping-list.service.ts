import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {ShoppingList} from "./model/shopping-list";
import {Item} from "./model/item";

@Injectable()
export class ShoppingListService {

  private listsUrl = 'api/lists';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getShoppingLists(): Promise<ShoppingList[]> {
    return this.http.get(this.listsUrl)
      .toPromise()
      .then(response => response.json().data as ShoppingList[])
      .catch(this.handleError);
  }

  getShoppingList(id: number): Promise<ShoppingList> {
    const url = this.listsUrl + `/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as ShoppingList)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
