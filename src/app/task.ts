import {PriorityType} from './priority-type.enum';
import {Manager} from './manager';

export class Task {
  taskID: string;
  description: string;
  report: string;
  completed: boolean;
  priority: PriorityType;
}
