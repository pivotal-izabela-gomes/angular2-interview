import {Component, OnInit} from "@angular/core";
import {Item} from "../model/item";
import {ShoppingList} from "../model/shopping-list";
import {ShoppingListService} from "../shopping-list.service";
import {Params, ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  item: Item;

  constructor(
    private listService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.listService.getItem(+params['id']))
      .subscribe(item => this.item = item);
  }
}
