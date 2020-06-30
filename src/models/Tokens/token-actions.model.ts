import { TokenActionClass } from '../../classes/token.classes';
import { ActionType, TokenType } from '../hex.model';

export class TokenActionMove extends TokenActionClass {
  name: 'Action Move';
  effect = ActionType.MOVE;
}
export class TokenActionRotate extends TokenActionClass {
  name: 'Action Rotate';
  effect = ActionType.ROTATE;
}
export class TokenActionBattle extends TokenActionClass {
  name: 'Action Battle';
  effect = ActionType.BATTLE;
}
export class TokenActionPush extends TokenActionClass {
  name: 'Action Push';
  effect = ActionType.PUSH;
}
export class TokenActionSniper extends TokenActionClass {
  name: 'Action Push';
  effect = ActionType.SNIPER;
}
export class TokenActionGrenade extends TokenActionClass {
  name: 'Action Grenade';
  effect = ActionType.GRENADE;
}
export class TokenActionBomb extends TokenActionClass {
  name: 'Action Bomb';
  effect = ActionType.BOMB;
}
