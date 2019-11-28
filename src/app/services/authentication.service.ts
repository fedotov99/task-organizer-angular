import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(email, password) {
    if (email === "email" && password === "password") {
      sessionStorage.setItem('sessionUserID', email)
      sessionStorage.setItem('role', 'manager'); // TODO: set role
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('sessionUserID')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('email')
  }
}
