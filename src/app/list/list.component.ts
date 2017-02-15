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

  constructor(
    private location: Location,
    private listService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.listService.getShoppingList(+params['id']))
      .subscribe(shoppingList => this.items = shoppingList.items);

  }

  goBack(): void {
    this.location.back();
  }
}
