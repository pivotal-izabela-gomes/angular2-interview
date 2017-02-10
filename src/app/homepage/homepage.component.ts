import { Component, OnInit } from '@angular/core';

import {ShoppingList} from "../model/shopping-list";
import {ListService} from "../list.service";

@Component({
  moduleId: module.id,
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  lists: ShoppingList[] = [];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.listService.getLists()
      .then(lists => this.lists = lists);
  }
}
