import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Manager} from "../classes/manager";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private managersUrl = 'http://localhost:8080/manager';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.managersUrl)
      .pipe(
        tap(_ => this.log('fetched managers')),
        catchError(this.handleError<Manager[]>('getManagers', []))
      );
  }

  addManager(managerName: string): Observable<Manager> {
    const url = `${this.managersUrl}/?name=${managerName}`;
    return this.http.post<Manager>(url, this.httpOptions).pipe(
      tap((newManager: Manager) => this.log(`added manager w/ id=${newManager.userID}`)),
      catchError(this.handleError<Manager>('addManager'))
    );
  }

  deleteManager(manager: Manager): Observable<Manager> {
    const id = manager.userID;
    const url = `${this.managersUrl}/${id}`;

    return this.http.delete<Manager>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted manager id=${id}`)),
      catchError(this.handleError<Manager>('deleteManager'))
    );
  }

  updateManager(manager: Manager): Observable<any> {
    const id = manager.userID;
    const url = `${this.managersUrl}/${id}`;

    return this.http.put(url, manager, this.httpOptions).pipe(
      tap(_ => this.log(`updated manager id=${id}`)),
      catchError(this.handleError<any>('updateManager'))
    );
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
