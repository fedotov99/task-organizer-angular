import { Component, OnInit } from '@angular/core';
import {Manager} from '../manager';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  managers: Manager[];

  constructor() { }

  ngOnInit() {
  }

}
