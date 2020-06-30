import {Army} from "./hex.model";

export interface Dictionary<T> {
  [key: string]: T;
}

export interface Player {
  name: string;
  armyType: Army
}
