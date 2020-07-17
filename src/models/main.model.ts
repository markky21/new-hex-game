import {Army} from "./hex.model";
import { BoardTokenClass, TokenClass } from '../classes/token.classes';

export interface Dictionary<T> {
  [key: string]: T;
}

export interface Player {
  name: string;
  armyType: Army;
  ready?: boolean;
  color?: string;
  tokens?: any[];
}

