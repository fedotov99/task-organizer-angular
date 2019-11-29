import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterGuardService {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authenticationService.isUserLoggedIn())
      return true;

    if (sessionStorage.getItem('role') == 'manager')
      this.router.navigate(["manager"]);
    if (sessionStorage.getItem('role') == 'subordinate')
      this.router.navigate(["subordinate"]);

    return false;
  }
}
