import {Manager} from "./manager";
import {PositionType} from "./position-type.enum";
import {Task} from './task';

export class Subordinate {
  userID: string;
  name: string;
//  localUserTaskList: Task[];   // Maybe we shouldn't store it there? Can we instead use backend API?
  manager: Manager;
  score: Number;
  position: PositionType;
}
