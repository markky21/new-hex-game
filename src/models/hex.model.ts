export enum Army {
  BORGO = 'borgo',
  MOLOCH = 'moloch',
  POST = 'post',
  HEGEMONY = 'hegemony',
}

export interface Shield {
  strength: number;
}

export interface SimpleAttack {
  strength: number;
  type: AttackType;
}

export interface SimpleShield {
  strength: number;
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
  position: string;
  direction: number;
  enableRotation: boolean;
  hp: number;
  poisoned: boolean;
  caughtByNet: boolean;
  attackRound: number[];
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
  NET = 'NET'
}

export enum EnhancementType {
  SPEED = 'SPEED',
  HP = 'HP',
  MELEE = 'MELEE',
  SHOT = 'SHOT',
  REPEATATTACK = 'REPEATATTACK'
}

export enum ActionType {
  MOVE = 'MOVE',
  ROTATE = 'ROTATE',
  BATTLE = 'BATTLE',
  PUSH = 'PUSH',
  SNIPER = 'SNIPER',
  GRENADE = 'GRENADE',
  BOMB = 'BOMB'
}
