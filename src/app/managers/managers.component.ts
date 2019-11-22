import { Component, OnInit } from '@angular/core';
import {Manager} from '../classes/manager';
import {ManagerService} from "../services/manager.service";

// This component is for administration and testing!
@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  managers: Manager[];

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    this.getManagers();
  }

  getManagers(): void {
    this.managerService.getManagers()
      .subscribe(managers => this.managers = managers);
  }

  add(managerName: string): void {
/*    let manager: Manager = new Manager();
    manager.name = managerName;*/

    this.managerService.addManager(managerName)
      .subscribe(manager => {
        this.managers.push(manager);
      });
  }

  update(manager: Manager): void {
    this.managerService.updateManager(manager)
      .subscribe();
  }

  delete(manager: Manager): void {
    this.managers = this.managers.filter(t => t !== manager);
    this.managerService.deleteManager(manager).subscribe();
  }

}
