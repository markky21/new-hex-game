export enum Army {
  BORGO = 'borgo',
  MOLOCH = 'moloch',
  POST = 'post',
  HEGEMONY = 'hegemony',
}

export interface SimpleAttack {
  strength: number;
  type: AttackType;
}

export interface SimpleEnhancement {
  strength: number;
  type: EnhancementType;
}

export interface Token {
  name: string;
  type: TokenType;
}

export interface BoardToken {
  position: string; // e.g. c3
  dir: number; // 0-5
  enableRotation: boolean;
  enableMovement: boolean;
  hp: number;
  shield: number[];
  poisoned: boolean;
  coughtByNet: boolean;
  speed: number;
}

export enum TokenType {
  ACTION = 'ACTIONTOKEN',
  SOLDIER = 'SOLDIER',
  ENHANCEMENT = 'ENHANCEMENT',
}

export enum AttackType {
  MELEE = 'MELEEATTACK',
  SHOT = 'SHOTATTACK',
  GAUSS = 'GAUSSATTACK',
}

export enum EnhancementType {
  SPEED = 'SPEED',
  HP = 'HP',
  MELEE = 'MELEE',
  SHOT = 'SHOT',
}

export enum ActionType {
  MOVE = 'MOVE',
  ROTATE = 'ROTATE',
  BATTLE = 'BATTLE',
  PUSH = 'PUSH',
  SNIPER = 'SNIPER',
  GRENADE = 'GRENADE',
}

export enum TokenBorgo {
  SIEPACZ = 'siepacz',
}

export enum TokenMoloch {
  CYBORG = 'cyborg',
}
