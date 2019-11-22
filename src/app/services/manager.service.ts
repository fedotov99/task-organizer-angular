import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Manager} from "../classes/manager";
import {catchError, tap} from "rxjs/operators";
import {Task} from "../classes/task";
import {Subordinate} from "../classes/subordinate";

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

  getManagerByID(id: string): Observable<Manager> {
    const url = `${this.managersUrl}/${id}`;
    return this.http.get<Manager>(url).pipe(
      tap(_ => this.log(`fetched manager id=${id}`)),
      catchError(this.handleError<Manager>(`getManager id=${id}`))
    );
  }

  getTasksOfManager(executorID: string): Observable<Task[]> {
    const url = `${this.managersUrl}/${executorID}/getManagerTaskList`;
    return this.http.get<Task[]>(url).pipe(
      tap(_ => this.log(`fetched tasks of manager ID=${executorID}`)),
      catchError(this.handleError<Task[]>(`tasks of manager ID=${executorID}`))
    );
  }

  getUncheckedTasksList(managerID: string): Observable<Task[]> {
    const url = `${this.managersUrl}/${managerID}/getUncheckedTaskList`;
    return this.http.get<Task[]>(url).pipe(
      tap(_ => this.log(`fetched unchecked tasks of manager ID=${managerID}`)),
      catchError(this.handleError<Task[]>(`getUncheckedTasksList of manager ID=${managerID}`))
    );
  }

  getSubordinatesOfManager(managerID: string): Observable<Subordinate[]> {
    const url = `${this.managersUrl}/${managerID}/getSubordinateList`;
    return this.http.get<Subordinate[]>(url).pipe(
      tap(_ => this.log(`fetched subordinates of manager ID=${managerID}`)),
      catchError(this.handleError<Subordinate[]>(`subordinates of manager ID=${managerID}`))
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

  updateTaskInManagerTaskList(task: Task, managerID: string): Observable<any> {
    // const id = ...; // TODO: session manager userID
    const id = managerID; // TODO: delete it
    const taskID = task.taskID;
    const url = `${this.managersUrl}/${id}/update`;

    return this.http.put(url, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated taskID=${taskID} in manager's id=${id} task list`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  deleteTaskFromManagerTaskList(task: Task, managerID: string): Observable<Task> {
    // const id = ...; // TODO: session manager userID
    const id = managerID; // TODO: delete it
    const taskID = task.taskID;
    const url = `${this.managersUrl}/${id}/delete?taskID=${taskID}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted taskID=${taskID} from manager's id=${id} task list`)),
      catchError(this.handleError<Task>('deleteTaskFromManagerTaskList'))
    );
  }

  assignTaskToSubordinate(task: Task, managerID: string, subordinateID: string) {
    // const id = ...; // TODO: session subordinate userID
    const id = managerID; // TODO: delete it
    const taskID = task.taskID;
    const url = `${this.managersUrl}/${id}/assignTaskToSubordinate?taskID=${taskID}&subordinateID=${subordinateID}`;

    return this.http.post(url, this.httpOptions).pipe(
      tap(_ => this.log(`assigned taskID=${taskID} to subordinateID=${subordinateID} of managerID=${managerID}`)),
      catchError(this.handleError<Task>('assignTaskToSubordinate'))
    );
  }

  approveTask(managerID: string, taskID: string) {
    // const id = ...; // TODO: session subordinate userID
    const id = managerID; // TODO: delete it
    const url = `${this.managersUrl}/${id}/approveTask?taskID=${taskID}`;

    return this.http.post(url, this.httpOptions).pipe(
      tap(_ => this.log(`approved taskID=${taskID} in unchecked task list of managerID=${managerID}`)),
      catchError(this.handleError<Task>('approveTask'))
    );
  }

  declineTask(managerID: string, taskID: string) {
    // const id = ...; // TODO: session subordinate userID
    const id = managerID; // TODO: delete it
    const url = `${this.managersUrl}/${id}/declineTask?taskID=${taskID}`;

    return this.http.post(url, this.httpOptions).pipe(
      tap(_ => this.log(`declined taskID=${taskID} in unchecked task list of managerID=${managerID}`)),
      catchError(this.handleError<Task>('declineTask'))
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
