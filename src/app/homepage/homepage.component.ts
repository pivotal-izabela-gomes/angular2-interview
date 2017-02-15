import { Component, OnInit } from '@angular/core';

import {ShoppingList} from "../model/shopping-list";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  moduleId: module.id,
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  lists: ShoppingList[] = [];

  constructor(private listService: ShoppingListService) {}

  ngOnInit(): void {
    this.listService.getShoppingLists()
      .then(lists => this.lists = lists);
  }
}
