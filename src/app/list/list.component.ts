import {Component, OnInit, Input} from "@angular/core";
import { Location } from '@angular/common';
import {Item} from "../model/item";
import {ShoppingListService} from "../shopping-list.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{
  items: Item[] = [];
  listId: number;

  constructor(
    private location: Location,
    private listService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        this.listId = params['id'];
        return this.listService.getItemsByListId(+this.listId);
      })
      .subscribe(items => this.items = items);
  }

  goBack(): void {
    this.location.back();
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
}
