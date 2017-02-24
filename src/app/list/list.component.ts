import {Component, OnInit} from "@angular/core";
import { Location } from '@angular/common';
import {Item} from "../model/item";
import {ShoppingListService} from "../shopping-list.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {ShoppingList} from "../model/shopping-list";
import {Subject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";

@Component({
  moduleId: module.id,
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  items: Item[] = [];
  listId: number;
  list: ShoppingList;
  foundItems: Observable<Item[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private location: Location,
    private listService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        this.listId = params['id'];
        this.listService.getShoppingLists().then(lists => this.list = lists.find(l => l.id == this.listId));
        return this.listService.getItemsByListId(+this.listId);
      })
      .subscribe(items => this.items = items);

    this.foundItems = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.listService.search(term, this.listId)
        // or the observable of empty items if there was no search term
        : Observable.of<Item[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Item[]>([]);
      });
  }

  goBack(): void {
    this.location.back();
  }

  saveName(): void {
    this.listService.updateShoppingList(this.list).then();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.listService.addItem(this.listId, name)
      .then(item =>
        this.items.push(item)
      );
  }

  delete(item: Item): void {
    this.listService
      .deleteItem(item.id)
      .then(() => {
        this.items = this.items.filter(i => i != item);
      })
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
