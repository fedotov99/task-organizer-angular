import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AuthRespond} from "../classes/auth-respond";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  invalidLogin = false;
  authRespond: AuthRespond;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.authenticationService.authenticate(this.email, this.password)
      .subscribe(authRespond => {
        this.authRespond = authRespond;


        if (this.authRespond.success == false) {
          this.invalidLogin = true;
          this.router.navigate(['login']);
        } else if (this.authRespond.success == true) {
          sessionStorage.setItem('sessionUserID', this.authRespond.sessionUserID);
          if (this.authRespond.role == "ROLE_MANAGER") {
            sessionStorage.setItem('role', 'manager');
            this.router.navigate(['manager']);
          } else if (this.authRespond.role == "ROLE_SUBORDINATE") {
            sessionStorage.setItem('role', 'subordinate');
            this.router.navigate(['subordinate']);
          }

          this.invalidLogin = false;
        }
      });
  }
}
