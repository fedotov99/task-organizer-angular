import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Task} from "../classes/task";
import {catchError, map, tap} from "rxjs/operators";
import {PriorityType} from "../classes/priority-type.enum";
import {Subordinate} from "../classes/subordinate";
import {Manager} from "../classes/manager";

@Injectable({
  providedIn: 'root'
})
export class SubordinateService {
  private subordinatesUrl = 'http://localhost:8080/subordinate';  // URL to web api
  private subordinateRegisterUrl = 'http://localhost:8080/create/subordinate';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getSubordinates(): Observable<Subordinate[]> {
    return this.http.get<Subordinate[]>(this.subordinatesUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched subordinates')),
        catchError(this.handleError<Subordinate[]>('getSubordinates', []))
      );
  }

  getSubordinateByID(id: string): Observable<Subordinate> {
    const url = `${this.subordinatesUrl}/${id}`;
    return this.http.get<Subordinate>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched subordinate id=${id}`)),
      catchError(this.handleError<Subordinate>(`getSubordinate id=${id}`))
    );
  }

  // subordinate would like to see info about his manager
  getManagerInfoByID(id: string): Observable<Manager> {
    const url = `${this.subordinatesUrl}/getManagerInfo/${id}`;

    return this.http.get<Manager>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched manager id=${id}`)),
      catchError(this.handleError<Manager>(`getManager id=${id}`))
    );
  }

  getTasksOfSubordinate(executorID: string): Observable<Task[]> {
    const url = `${this.subordinatesUrl}/${executorID}/getSubordinateTaskList`;
    return this.http.get<Task[]>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched tasks of subordinate ID=${executorID}`)),
      catchError(this.handleError<Task[]>(`tasks of subordinate ID=${executorID}`))
    );
  }

  addSubordinate(subordinate: Subordinate): Observable<Subordinate> {
    const url = `${this.subordinateRegisterUrl}`;
    return this.http.post<Subordinate>(url, subordinate).pipe(
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

  addTask(task: Task): Observable<Task> {
    const url = `${this.subordinatesUrl}/task`;
    return this.http.post<Task>(url, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.taskID}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  updateTaskInSubordinateTaskList(task: Task, subordinateID: string): Observable<any> {
    const id = subordinateID;
    const taskID = task.taskID;
    const url = `${this.subordinatesUrl}/${id}/update`;

    return this.http.put(url, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated taskID=${taskID} in subordinate's id=${id} task list`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  deleteTaskFromSubordinateTaskList(task: Task, subordinateID: string): Observable<Task> {
    const id = subordinateID;
    const taskID = task.taskID;
    const url = `${this.subordinatesUrl}/${id}/delete?taskID=${taskID}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted taskID=${taskID} from subordinate's id=${id} task list`)),
      catchError(this.handleError<Task>('deleteTaskFromSubordinateTaskList'))
    );
  }

  sendToManager(task: Task, subordinateID: string) {
    const id = subordinateID;
    const taskID = task.taskID;
    const url = `${this.subordinatesUrl}/${id}/complete`;

    return this.http.post(url, task, this.httpOptions).pipe(
      tap(_ => this.log(`sended taskID=${taskID} of subordinateID=${id} to manager`)),
      catchError(this.handleError<Task>('sendToManager'))
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
