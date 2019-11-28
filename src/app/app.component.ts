import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {SubordinateService} from "./services/subordinate.service";
import {ManagerService} from "./services/manager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Organizer';

  constructor(private authenticationService: AuthenticationService) { }
}
