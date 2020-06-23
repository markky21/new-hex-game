import {
  ActionType,
  AttackType,
  BoardToken,
  EnhancementType,
  SimpleAttack,
  SimpleEnhancement,
  Token,
  TokenType,
} from '../models/hex.model';

/**
 * Classes
 */
export class AttacksClass {
  constructor(public actions: SimpleAttackClass[]) {}

  // TODO create cta method witch gonna execute the attacks listed in array
}

export class BoardTokenClass implements BoardToken {
  position: string;
  dir: number;
  enableRotation: boolean;
  enableMovement: boolean;
  hp: number;
  shield: number[];
  poisoned: boolean;
  coughtByNet: boolean;
  speed: number;

  constructor(initial: Partial<BoardToken>) {
    Object.entries(initial).map(([key, value]) => (this[key] = value));
  }

  // TODO: add methods for traversing board
  // TODO: add method for checking enhancements
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
export interface TokenSoldier extends Token {
  type: TokenType;
  board: BoardTokenClass;
  attacks: AttacksClass;
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

export abstract class TokenClass implements Token {
  abstract name: string;
  abstract type: TokenType;
}

export abstract class TokenSoldierClass extends TokenClass implements TokenSoldier {
  type = TokenType.SOLDIER;
  abstract board: BoardTokenClass;
  abstract attacks: AttacksClass;
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
  abstract actions: SimpleEnhancementClass[];

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
