import {Component, OnInit} from '@angular/core';
import {Task} from '../classes/task';
import {TaskService} from '../services/task.service';
import {PriorityType} from '../classes/priority-type.enum';
import {ManagerService} from "../services/manager.service";
import {Manager} from "../classes/manager";
import {Subordinate} from "../classes/subordinate";

@Component({
  selector: 'app-manager-tasks',
  templateUrl: './manager-tasks.component.html',
  styleUrls: ['./manager-tasks.component.css']
})

export class ManagerTasksComponent implements OnInit {
  manager: Manager;
  tasks: Task[];
  managerSubordinates: Subordinate[]; // subordinates of this manager
  selectedSubordinateID: string;
  selectedPriority = 'NORMAL';
  priorityOfCurrentTask: PriorityType = PriorityType.NORMAL;
  isUrgent: PriorityType = PriorityType.URGENT;

  sessionUserID: string = "5dd66540c201be1af063db12"; // TODO: delete

  constructor(private taskService: TaskService, private managerService: ManagerService) { }

  ngOnInit() {
    // this.getTasks();
    this.getTasksByExecutor(this.sessionUserID); // TODO: pass session userID
    this.getManagerByID(this.sessionUserID);
    this.getSubordinatesOfManager(this.sessionUserID);
  }

  getAllTasksFromDB(): void {
    this.taskService.getAllTasksFromDB()
      .subscribe(tasks => this.tasks = tasks);
  }

  getTasksByExecutor(executorID: string): void {
    this.managerService.getTasksOfManager(executorID)
      .subscribe(tasks => this.tasks = tasks);
  }

  getSubordinatesOfManager(managerID: string): void {
    this.managerService.getSubordinatesOfManager(managerID)
      .subscribe(managerSubordinates => this.managerSubordinates = managerSubordinates);
  }

  getManagerByID(managerID: string): void {
    this.managerService.getManagerByID(managerID)
      .subscribe(manager => this.manager = manager);
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
    this.managerService.updateTaskInManagerTaskList(task, this.sessionUserID)
      .subscribe();
    /*newTask => {
        this.tasks.push(newTask);
      });*/
  }

  // TODO: call to manager service special method
  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    // this.taskService.deleteTask(task).subscribe();
    // we shouldn't call deleting task from DB method.
    // Instead, we must work with local user task list
    this.managerService.deleteTaskFromManagerTaskList(task, this.sessionUserID).subscribe();
  }

  assignTaskToSubordinate(task: Task): void {
    let subordinateID: string = this.selectedSubordinateID;
    this.tasks = this.tasks.filter(t => t !== task);
    this.managerService.assignTaskToSubordinate(task, this.sessionUserID, subordinateID) // Todo: delete second param (session)
      .subscribe();
  }
}
