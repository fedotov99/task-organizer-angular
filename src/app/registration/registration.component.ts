import { Component, OnInit } from '@angular/core';
import {Manager} from "../classes/manager";
import {Subordinate} from "../classes/subordinate";
import {ManagerService} from "../services/manager.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  manager: Manager;
  subordinate: Subordinate;

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
  }

  registerManager(managerName: string, managerEmail: string, managerPassword: string): void {
    this.managerService.addManager(managerName, managerEmail, managerPassword)
      .subscribe(manager => {
        this.manager = manager;
      });
  }

  registerSubordinate(managerName: string, managerEmail: string, managerPassword: string): void {
    this.managerService.addManager(managerName, managerEmail, managerPassword)
      .subscribe(manager => {
        this.manager = manager;
      });
  }
}
