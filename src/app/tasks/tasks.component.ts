import {Component, OnInit} from '@angular/core';
import {Task} from '../classes/task';
import {TaskService} from '../services/task.service';
import {PriorityType} from '../classes/priority-type.enum';
import {SubordinateService} from "../services/subordinate.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedPriority = 'NORMAL';
  priorityOfCurrentTask: PriorityType = PriorityType.NORMAL;
  isUrgent: PriorityType = PriorityType.URGENT;

  sessionUserID: string = "5dd66540c201be1af063db12"; // TODO: delete

  constructor(private taskService: TaskService, private subordinateService: SubordinateService) { }

  ngOnInit() {
    // this.getTasks();
    this.getTasksByExecutor(this.sessionUserID); // TODO: pass session userID
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  getTasksByExecutor(executorID: string): void {
    this.subordinateService.getTasksOfSubordinate(executorID)
      .subscribe(tasks => this.tasks = tasks);
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
    this.taskService.updateTask(task)
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
    this.taskService.deleteTask(task).subscribe();
  }
}
