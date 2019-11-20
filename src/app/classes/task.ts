import {PriorityType} from './priority-type.enum';

export class Task {
  taskID: string;
  description: string;
  report: string;
  completed: boolean;
  priority: PriorityType;
  executorID: string; // todo: when creat task, don't forget to add task to user
}
