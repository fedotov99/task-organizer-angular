import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  invalidLogin = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    if (this.authenticationService.authenticate(this.email, this.password)) {
      if (sessionStorage.getItem('role') == 'manager') {
        this.router.navigate(['manager']);
      }
      else if (sessionStorage.getItem('role') == 'subordinate') {
        this.router.navigate(['subordinate']);
      }

      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

}
