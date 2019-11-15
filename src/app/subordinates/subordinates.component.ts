import { Component, OnInit } from '@angular/core';
import {Subordinate} from "../classes/subordinate";
import {PriorityType} from "../classes/priority-type.enum";
import {Task} from "../classes/task";
import {SubordinateService} from "../services/subordinate.service";

@Component({
  selector: 'app-subordinates',
  templateUrl: './subordinates.component.html',
  styleUrls: ['./subordinates.component.css']
})
export class SubordinatesComponent implements OnInit {
  subordinates: Subordinate[];

  constructor(private subordinateService: SubordinateService) { }

  ngOnInit() {
    this.getSubordinates();
  }

  getSubordinates(): void {
    this.subordinateService.getSubordinates()
      .subscribe(subordinates => this.subordinates = subordinates);
  }

  add(subordinate: Subordinate): void {

    this.subordinateService.addSubordinate(subordinate)
      .subscribe(subordinate => {
        this.subordinates.push(subordinate);
      });
  }

  update(subordinate: Subordinate): void {
    this.subordinateService.updateSubordinate(subordinate)
      .subscribe();
  }

  delete(subordinate: Subordinate): void {
    this.subordinates = this.subordinates.filter(t => t !== subordinate);
    this.subordinateService.deleteSubordinate(subordinate).subscribe();
  }

}
