import {PriorityType} from './priority-type.enum';

export class Task {
  taskID: string;
  description: string;
  report: string;
  completed: boolean;
  priority: PriorityType;
}
