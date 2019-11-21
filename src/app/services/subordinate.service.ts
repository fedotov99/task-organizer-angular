import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Task} from "../classes/task";
import {catchError, map, tap} from "rxjs/operators";
import {PriorityType} from "../classes/priority-type.enum";
import {Subordinate} from "../classes/subordinate";

@Injectable({
  providedIn: 'root'
})
export class SubordinateService {
  private subordinatesUrl = 'http://localhost:8080/subordinate';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getSubordinates(): Observable<Subordinate[]> {
    return this.http.get<Subordinate[]>(this.subordinatesUrl)
      .pipe(
        tap(_ => this.log('fetched subordinates')),
        catchError(this.handleError<Subordinate[]>('getSubordinates', []))
      );
  }

  addSubordinate(subordinate: Subordinate): Observable<Subordinate> {
    let managerID: string = subordinate.managerID;
    const url = `${this.subordinatesUrl}/?managerID=${managerID}`;
    return this.http.post<Subordinate>(url, subordinate, this.httpOptions).pipe(
      tap((newSubordinate: Subordinate) => this.log(`added subordinate w/ id=${newSubordinate.userID}`)),
      catchError(this.handleError<Subordinate>('addSubordinate'))
    );
  }

  deleteSubordinate(subordinate: Subordinate): Observable<Subordinate> {
    const id = subordinate.userID;
    const url = `${this.subordinatesUrl}/${id}`;

    return this.http.delete<Subordinate>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted subordinate id=${id}`)),
      catchError(this.handleError<Subordinate>('deleteSubordinate'))
    );
  }

  updateSubordinate(subordinate: Subordinate): Observable<any> {
    const id = subordinate.userID;
    const url = `${this.subordinatesUrl}/${id}`;

    return this.http.put(url, subordinate, this.httpOptions).pipe(
      tap(_ => this.log(`updated subordinate id=${id}`)),
      catchError(this.handleError<any>('updateSubordinate'))
    );
  }

  sendToManager(task: Task, subordinateID: string): Observable<string> {
    // const id = ...; // TODO: session subordinate userID
    const id = subordinateID; // TODO: delete it
    const taskID = task.taskID;
    const url = `${this.subordinatesUrl}/${id}/sendRequestToManager?taskID=${taskID}`;

    return this.http.get<string>(url, this.httpOptions).pipe(
      tap(_ => this.log(`sended taskID=${taskID} of subordinateID=${id} to manager`)),
      catchError(this.handleError<string>('updateTask'))
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
    this.messageService.add(`SubordinateService: ${message}`);
  }
}
