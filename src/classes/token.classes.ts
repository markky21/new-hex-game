import {
  ActionType,
  AttackType,
  BoardToken,
  EnhancementType,
  SimpleAttack,
  SimpleEnhancement,
  SimpleShield,
  Token,
  TokenType,
} from '../models/hex.model';
import { Dictionary } from '../models/main.model';

/**
 * Classes
 */
export class AttacksClass {
  constructor(public attacks: Dictionary<SimpleAttackClass | SimpleAttackClass[]>) {}

  // TODO create cta method which gonna execute the attacks listed in array
}

export class ShieldsClass {
  constructor(public shields: Dictionary<SimpleShieldClass>) {}
}

export class EnhancementsClass {
  constructor(public actions: Dictionary<SimpleEnhancementClass | SimpleEnhancementClass[]>) {}

  // TODO create cta method witch gonna execute the enhancements listed in array
}

export class BoardTokenClass implements BoardToken {
  name: string;
  position: string;
  direction: number;
  enableRotation: boolean;
  attacks: Dictionary<SimpleAttackClass | SimpleAttackClass[]>;
  shields: Dictionary<SimpleShieldClass | SimpleShieldClass[]>;
  enhancements: Dictionary<SimpleEnhancementClass | SimpleEnhancementClass[]>;
  hp: number;
  poisoned: boolean;
  caughtByNet: boolean;
  attackRound: number[];

  constructor(initial?: Partial<BoardToken>) {
    if (initial) {
      Object.entries(initial).map(([key, value]) => (this[key] = value));
    }
  }

  // TODO: add methods for traversing board
  // TODO: add method for checking enhancements
}

export class SimpleShieldClass implements SimpleShield {
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
  abstract attacks: Dictionary<SimpleAttackClass | SimpleAttackClass[]>;
  abstract shields: Dictionary<SimpleShieldClass | SimpleShieldClass[]>;
  abstract enableMovement: boolean;
}

export abstract class TokenBaseClass extends BoardTokenClass {
  type = TokenType.BASE;
  board = new BoardTokenClass({ hp: 20, attackRound: [0] });
  attacks = {
    7: new SimpleAttackClass(AttackType.MELEE, 1)
  };
  abstract enableMovement: boolean;
  abstract enhancements: Dictionary<SimpleEnhancementClass | SimpleEnhancementClass[]>;
  abstract name: string;
  abstract shields: Dictionary<SimpleShieldClass | SimpleShieldClass[]>;
}

export abstract class TokenActionClass extends TokenClass implements TokenAction {
  type = TokenType.ACTION;
  abstract effect: ActionType;
}

export abstract class TokenEnhancementClass extends TokenClass implements TokenEnhancement {
  type = TokenType.ENHANCEMENT;
  abstract board: BoardTokenClass;
  abstract enhancements: Dictionary<SimpleEnhancementClass | SimpleEnhancementClass[]>;
}

/**
 * Interfaces
 */

export interface ArmyTokenSet {
  actionsTokens: { token: typeof TokenActionClass; amount: number }[];
  soldiersTokens: { token: typeof TokenSoldierClass; amount: number }[];
  enhancementsTokens: { token: typeof TokenEnhancementClass; amount: number }[];
}

export interface ArmyTokenSetInstance {
  actionsTokens: Array<TokenActionClass>;
  soldiersTokens: Array<TokenSoldierClass>;
  enhancementsTokens: Array<TokenEnhancementClass>;
}

export interface TokenSoldier extends Token {
  attacks: Dictionary<SimpleAttackClass | SimpleAttackClass[]>;
  board: BoardTokenClass;
  enableMovement: boolean;
  shields: Dictionary<SimpleShieldClass | SimpleShieldClass[]>;
  type: TokenType;
}

export interface TokenAction {
  type: TokenType;
  effect: ActionType;
}

export interface TokenEnhancement {
  type: TokenType;
  board: BoardTokenClass;
  enhancements: Dictionary<SimpleEnhancementClass | SimpleEnhancementClass[]>;
}
