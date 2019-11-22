import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from '../classes/task';
import { MessageService } from './message.service';


// ATTENTION! It is not recommended to call methods of this this service, because it works with
// TaskController (handling all tasks in database),
// without syncing with local user's data structures (localUserTasksList), except for task creating method,
// which adds task to localUserTasksList just after task has been created in DB.
// This service can be helpful for admin dashboard (if it is needed) or testing,
// but if we work with user's account, we should call specific user service's methods
// to be sure that user's local data structures are always up to date.

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'http://localhost:8080/task';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getAllTasksFromDB(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('fetched all tasks from DB')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  getTaskNo404<Data>(id: string): Observable<Task> {
    const url = `${this.tasksUrl}/?id=${id}`;
    return this.http.get<Task[]>(url)
      .pipe(
        map(tasks => tasks[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} task id=${id}`);
        }),
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
  }

  getTask(id: string): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  searchTask(term: string): Observable<Task[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Task[]>(`${this.tasksUrl}/?description=${term}`).pipe(
      tap(_ => this.log(`found tasks matching "${term}"`)),
      catchError(this.handleError<Task[]>('searchTasks', []))
    );
  }

  addTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}`;
    return this.http.post<Task>(url, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.taskID}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  // we shouldn't call this deleting task from DB method.
  // Instead, we must work with local user task list
  // see subordinate and manager services for the last one.
  deleteTask(task: Task | string): Observable<Task> {
    const id = typeof task === 'string' ? task : task.taskID;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  updateTask(task: Task): Observable<any> {
    const id = task.taskID;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.put(url, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${id}`)),
      catchError(this.handleError<any>('updateTask'))
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
    this.messageService.add(`TaskService: ${message}`);
  }
}
