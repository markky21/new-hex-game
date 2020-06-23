import {
  ActionType,
  AttackType,
  BoardToken,
  EnhancementType,
  SimpleAttack,
  SimpleEnhancement, SoldierShield,
  Token,
  TokenType,
} from '../models/hex.model';
import {Dictionary} from "../models/main.model";

/**
 * Classes
 */
export class AttacksClass {
  constructor(public attacks: Dictionary<SimpleAttackClass>) {}

  // TODO create cta method which gonna execute the attacks listed in array
}

export class EnhancementClass {
  constructor(public enhancements: Dictionary<SimpleEnhancementClass>) {}
}

export class SoldierShieldClass {
  constructor(public shields: Dictionary<ShieldClass>) {}
}

export class BoardTokenClass implements BoardToken {
  position: string;
  direction: number;
  enableRotation: boolean;
  hp: number;
  poisoned: boolean;
  caughtByNet: boolean;

  constructor(initial: Partial<BoardToken>) {
    Object.entries(initial).map(([key, value]) => (this[key] = value));
  }

  // TODO: add methods for traversing board
  // TODO: add method for checking enhancements
}

export class ShieldClass implements SoldierShield {
  constructor(public strength: number) {}
}

export class SimpleAttackClass implements SimpleAttack {
  constructor(public type: AttackType, public strength: number) {}

  // TODO create cta method witch gonna execute the attack
}

export class SimpleEnhancementClass implements SimpleEnhancement {
  constructor(public strength: number, public type: EnhancementType) {}

  // TODO create cta method witch gonna execute the enhancement
}

/**
 * Abstract classes
 */

export abstract class TokenClass implements Token {
  abstract name: string;
  abstract type: TokenType;
}

export abstract class TokenSoldierClass extends TokenClass implements TokenSoldier {
  type = TokenType.SOLDIER;
  abstract board: BoardTokenClass;
  abstract attacks: AttacksClass;
  abstract shields: SoldierShieldClass;
}

export abstract class TokenActionClass extends TokenClass implements TokenAction {
  type = TokenType.ACTION;
  abstract effect: ActionType;
}

export abstract class TokenEnhancementClass extends TokenClass implements TokenEnhancement {
  type = TokenType.ENHANCEMENT;
  abstract board: BoardTokenClass;
  abstract enhancements: EnhancementsClass;
}

export abstract class EnhancementsClass {
  abstract actions: SimpleEnhancementClass;

  // TODO create cta method witch gonna execute the enhancements listed in array
}

/**
 * Interfaces
 */

export interface ArmyTokenSet {
  actionsTokens: { token: typeof TokenActionClass; amount: number }[];
  soldiersTokens: { token: typeof TokenSoldierClass; amount: number }[];
  enhancementsTokens: { token: typeof TokenEnhancementClass; amount: number }[];
}

export interface TokenSoldier extends Token {
  type: TokenType;
  board: BoardTokenClass;
  attack: AttacksClass;
  speed: number;
  enableMovement: boolean;
  shields: ShieldClass;
}

export interface TokenAction {
  type: TokenType;
  effect: ActionType;
}

export interface TokenEnhancement {
  type: TokenType;
  board: BoardTokenClass;
  enhancements: EnhancementsClass;
}
