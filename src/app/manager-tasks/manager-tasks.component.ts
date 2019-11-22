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
  uncheckedTasks: Task[]; // list of tasks sent by subordinates for approval (or rejecting)
  managerSubordinates: Subordinate[]; // subordinates of this manager
  selectedSubordinateID: string;
  selectedPriority = 'NORMAL';
  priorityOfCurrentTask: PriorityType = PriorityType.NORMAL;
  isUrgent: PriorityType = PriorityType.URGENT;

  sessionUserID: string = "5dcf05b9c201be223ceda3df"; // TODO: delete

  constructor(private taskService: TaskService, private managerService: ManagerService) { }

  ngOnInit() {
    // this.getTasks();
    this.getTasksByExecutor(this.sessionUserID);
    this.getUncheckedTasksList(this.sessionUserID);
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

  getUncheckedTasksList(managerID: string): void {
    this.managerService.getUncheckedTasksList(managerID)
      .subscribe(uncheckedTasks => this.uncheckedTasks = uncheckedTasks);
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

  add(description: string): void {
    description = description.trim();
    if (!description) { return; }
    this.handlePriorityOfCreatedTask();

    let task = new Task();
    task.description = description;
    task.priority = this.priorityOfCurrentTask;
    task.executorID = this.sessionUserID;

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
    this.managerService.assignTaskToSubordinate(task, this.sessionUserID, subordinateID)
      .subscribe();
  }

  approveTask(task: Task): void {
    let taskID = task.taskID;
    this.uncheckedTasks = this.uncheckedTasks.filter(t => t !== task);
    this.managerService.approveTask(this.sessionUserID, taskID)
      .subscribe();
  }

  declineTask(task: Task): void {
    let taskID = task.taskID;
    this.uncheckedTasks = this.uncheckedTasks.filter(t => t !== task);
    this.managerService.declineTask(this.sessionUserID, taskID)
      .subscribe();
  }
}
