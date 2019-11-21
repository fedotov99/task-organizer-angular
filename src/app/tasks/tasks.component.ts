import {Component, OnInit} from '@angular/core';
import {Task} from '../classes/task';
import {TaskService} from '../services/task.service';
import {PriorityType} from '../classes/priority-type.enum';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private taskService: TaskService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.getTasks();
    this.getTasksByExecutor("5dcf05b9c201be223ceda3df"); // TODO: pass session userID
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  getTasksByExecutor(executorID: string): void {
    this.taskService.getTasksByExecutor(executorID)
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

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }
}
