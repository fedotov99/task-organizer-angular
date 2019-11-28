import { Component, OnInit } from '@angular/core';
import {Manager} from "../classes/manager";
import {Subordinate} from "../classes/subordinate";
import {ManagerService} from "../services/manager.service";
import {Router} from "@angular/router";
import {PositionType} from "../classes/position-type.enum";
import {SubordinateService} from "../services/subordinate.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  manager: Manager;
  subordinate: Subordinate;
  managers: Manager[];
  selectedPosition = 'Junior';
  positionOfCurrentSubordinate: PositionType = PositionType.Junior;
  selectedManagerID: string;

  constructor(private managerService: ManagerService, private subordinateService: SubordinateService, private router: Router) { }

  ngOnInit() {
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

  // because when we create subordinate, we have to choose the existing manager
  getManagers(): void {
    this.managerService.getManagers()
      .subscribe(managers => this.managers = managers);
  }

  registerManager(managerName: string, managerEmail: string, managerPassword: string): void {
    this.managerService.addManager(managerName, managerEmail, managerPassword)
      .subscribe(manager => {
        this.manager = manager;
      });

    // sessionStorage.setItem('sessionUserID', this.manager.userID);
    // this.router.navigate(['manager']);
  }

  registerSubordinate(subordinateName: string, subordinateEmail: string, subordinatePassword: string, score: Number): void {
    this.handlePositionOfCreatedSubordinate();

    let subordinate: Subordinate = new Subordinate();
    subordinate.name = subordinateName;
    subordinate.email = subordinateEmail;
    subordinate.password = subordinatePassword;
    subordinate.managerID = this.selectedManagerID;
    subordinate.score = score;
    subordinate.position = this.positionOfCurrentSubordinate;

    this.subordinateService.addSubordinate(subordinate)
      .subscribe(subordinate => {
        this.subordinate = subordinate;
      });
  }
}
