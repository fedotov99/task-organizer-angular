import {Component, OnInit} from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {PriorityType} from '../priority-type.enum';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedPriority = 'NORMAL';
  priorityOfCreatedTask: PriorityType = PriorityType.NORMAL;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  handlePriorityOfCreatedTask(): void {
    switch (this.selectedPriority) {
      case 'LOW': {
        this.priorityOfCreatedTask = PriorityType.LOW;
        break;
      }
      case 'NORMAL': {
        this.priorityOfCreatedTask = PriorityType.NORMAL;
        break;
      }
      case 'HIGH': {
        this.priorityOfCreatedTask = PriorityType.HIGH;
        break;
      }
      case 'URGENT': {
        this.priorityOfCreatedTask = PriorityType.URGENT;
        break;
      }
      default: {
        this.priorityOfCreatedTask = PriorityType.NORMAL;
        break;
      }
    }
  }

  add(description: string): void {
    description = description.trim();
    if (!description) { return; }

    this.handlePriorityOfCreatedTask();

    this.taskService.addTask(description, this.priorityOfCreatedTask)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

}
