import { Component, OnInit } from '@angular/core';
import {Subordinate} from "../classes/subordinate";
import {PositionType} from "../classes/position-type.enum";
import {SubordinateService} from "../services/subordinate.service";
import {Manager} from "../classes/manager";
import {ManagerService} from "../services/manager.service";

@Component({
  selector: 'app-subordinates',
  templateUrl: './subordinates.component.html',
  styleUrls: ['./subordinates.component.css']
})
export class SubordinatesComponent implements OnInit {
  subordinates: Subordinate[];
  managers: Manager[];
  selectedPosition = 'Junior';
  positionOfCurrentSubordinate: PositionType = PositionType.Junior;
  selectedManagerID: string;

  constructor(private subordinateService: SubordinateService, private managerService: ManagerService) { }

  ngOnInit() {
    this.getSubordinates();
    this.getManagers();
  }

  handlePositionOfCreatedSubordinate(): void {
    switch (this.selectedPosition) {
      case 'Junior': {
        this.positionOfCurrentSubordinate = PositionType.Junior;
        break;
      }
      case 'Middle': {
        this.positionOfCurrentSubordinate = PositionType.Middle;
        break;
      }
      case 'Senior': {
        this.positionOfCurrentSubordinate = PositionType.Senior;
        break;
      }
      default: {
        this.positionOfCurrentSubordinate = PositionType.Junior;
        break;
      }
    }
  }

  getSubordinates(): void {
    this.subordinateService.getSubordinates()
      .subscribe(subordinates => this.subordinates = subordinates);
  }

  // because when we create subordinate, we have to choose the existing manager
  getManagers(): void {
    this.managerService.getManagers()
      .subscribe(managers => this.managers = managers);
  }

  add(subordinateName: string, score: Number): void {
    this.handlePositionOfCreatedSubordinate();

    let subordinate: Subordinate = new Subordinate();
    subordinate.name = subordinateName;
    subordinate.managerID = this.selectedManagerID;
    subordinate.score = score;
    subordinate.position = this.positionOfCurrentSubordinate;

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
