import {Component, OnInit} from "@angular/core";
import {Item} from "../model/item";
import {ShoppingListService} from "../shopping-list.service";
import {Params, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  moduleId: module.id,
  selector: 'item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  item: Item;

  constructor(
    private listService: ShoppingListService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.listService.getItem(+params['id']))
      .subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.listService.updateItem(this.item).then(item => {
      this.item = item;
      this.goBack();
    });
  }
}
