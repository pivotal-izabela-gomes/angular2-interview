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

  add(listName: string): void {
    this.listService.addShoppingList(listName).then((list: ShoppingList) => this.lists.push(list));
  }

  delete(list: ShoppingList): void {
    this.listService
      .deleteShoppingList(list.id)
      .then(() => {
        this.lists = this.lists.filter(l => l != list);
      })
  }
}
