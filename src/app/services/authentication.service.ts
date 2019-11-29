import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {AuthRespond} from "../classes/auth-respond";
import {AuthBody} from "../classes/auth-body";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = 'http://localhost:8080/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  authenticate(email, password): Observable<AuthRespond> {
    const url = `${this.authUrl}`;
    let authBody: AuthBody = new AuthBody();
    authBody.email = email;
    authBody.password = password;

    return this.http.post<AuthRespond>(url, authBody, this.httpOptions).pipe(
      tap((newAuthRespond: AuthRespond) => this.log(`authentication respond`)),
      catchError(this.handleError<AuthRespond>('authenticate'))
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('sessionUserID')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('sessionUserID')
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ManagerService: ${message}`);
  }
}
