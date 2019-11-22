import {Component, OnInit} from '@angular/core';
import {Task} from '../classes/task';
import {TaskService} from '../services/task.service';
import {PriorityType} from '../classes/priority-type.enum';
import {SubordinateService} from "../services/subordinate.service";
import {Subordinate} from "../classes/subordinate";

@Component({
  selector: 'app-subordinate-tasks',
  templateUrl: './subordinate-tasks.component.html',
  styleUrls: ['./subordinate-tasks.component.css']
})
export class SubordinateTasksComponent implements OnInit {
  tasks: Task[];
  subordinate: Subordinate;
  selectedPriority = 'NORMAL';
  priorityOfCurrentTask: PriorityType = PriorityType.NORMAL;
  isUrgent: PriorityType = PriorityType.URGENT;

  sessionUserID: string = "5dd66540c201be1af063db12"; // TODO: delete

  constructor(private taskService: TaskService, private subordinateService: SubordinateService) { }

  ngOnInit() {
    // this.getTasks();
    this.getTasksByExecutor(this.sessionUserID); // TODO: pass session userID
    this.getSubordinateByID(this.sessionUserID);
  }

  getAllTasksFromDB(): void {
    this.taskService.getAllTasksFromDB()
      .subscribe(tasks => this.tasks = tasks);
  }

  getTasksByExecutor(executorID: string): void {
    this.subordinateService.getTasksOfSubordinate(executorID)
      .subscribe(tasks => this.tasks = tasks);
  }

  getSubordinateByID(subordinateID: string): void {
    this.subordinateService.getSubordinateByID(subordinateID)
      .subscribe(subordinate => this.subordinate = subordinate);
  }

  handlePriorityOfCreatedTask(): void {
    switch (this.selectedPriority) {
      case 'LOW': {
        this.priorityOfCurrentTask = PriorityType.LOW;
        break;
      }
      case 'NORMAL': {
        this.priorityOfCurrentTask = PriorityType.NORMAL;
        break;
      }
      case 'HIGH': {
        this.priorityOfCurrentTask = PriorityType.HIGH;
        break;
      }
      case 'URGENT': {
        this.priorityOfCurrentTask = PriorityType.URGENT;
        break;
      }
      default: {
        this.priorityOfCurrentTask = PriorityType.NORMAL;
        break;
      }
    }
  }

  add(description: string, executorID: string): void { // TODO: delete 2nd param
    description = description.trim();
    if (!description) { return; }
    this.handlePriorityOfCreatedTask();

    let task = new Task();
    task.description = description;
    task.priority = this.priorityOfCurrentTask;
    // task.executorID = ...; // TODO: pass session userID
    task.executorID = executorID;

    this.taskService.addTask(task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  update(task: Task): void {
    this.subordinateService.updateTaskInSubordinateTaskList(task, this.sessionUserID)
      .subscribe();
    /*newTask => {
        this.tasks.push(newTask);
      });*/
  }

  sendToManager(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.subordinateService.sendToManager(task, this.sessionUserID) // Todo: delete second param (session)
      .subscribe();
  }

  // TODO: call to subordinate service special method
  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    // this.taskService.deleteTask(task).subscribe();
    // we shouldn't call deleting task from DB method.
    // Instead, we must work with local user task list
    this.subordinateService.deleteTaskFromSubordinateTaskList(task, this.sessionUserID).subscribe();
  }
}