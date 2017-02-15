import {Component, OnInit} from "@angular/core";
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{

  constructor(
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}
