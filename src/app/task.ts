import {PriorityType} from './priority-type.enum';

export class Task {
  id: string;
  description: string;
  report: string;
  completed: boolean;
  priority: PriorityType;
}
