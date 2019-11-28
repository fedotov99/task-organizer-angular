import {Manager} from "./manager";
import {PositionType} from "./position-type.enum";
import {Task} from './task';

export class Subordinate {
  userID: string;
  name: string;
  email: string;
  password: string;
  managerID: string;
  score: Number;
  position: PositionType;
}
