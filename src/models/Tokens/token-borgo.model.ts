import {
  ArmyTokenSet,
  AttacksClass,
  BoardTokenClass,
  SimpleAttackClass,
  TokenSoldierClass,
} from '../../classes/token.classes';
import { AttackType } from '../hex.model';
import { TokenActionBattle, TokenActionGrenade, TokenActionMove } from './token-actions.model';


class BorgoSoldierMutty extends TokenSoldierClass {
  attacks = new AttacksClass([
    new SimpleAttackClass(AttackType.MELEE, 1),
    new SimpleAttackClass(AttackType.MELEE, 1),
    new SimpleAttackClass(AttackType.MELEE, 1),
  ]);
  board = new BoardTokenClass({ hp: 1, speed: 2 });
  name: 'Mutty';
}

export const TokenBorgoModel: ArmyTokenSet = {
  actionsTokens: [
    {
      token: TokenActionBattle,
      amount: 6,
    },
    {
      token: TokenActionMove,
      amount: 4,
    },
    {
      token: TokenActionGrenade,
      amount: 1,
    },
  ],
    soldiersTokens: [
    {
      token: BorgoSoldierMutty,
      amount: 6,
    },
    /* {
      token: {
        name: 'Cutler',
        attacks: [
          {
            dir: 0,
            strength: 1,
            type: AttackType.MELEE,
          },
        ],
        speed: 3,
        hp: 1,
      },
      amount: 4,
    },
    {
      token: {
        name: 'Webmaster',
        speed: 1,
        hp: 1,
        attacks: [
          {
            dir: 3,
            strength: 3,
            type: AttackType.MELEE,
          },
        ],
      },
      amount: 2,
    },
    {
      token: {
        name: 'Super-mutant',
        hp: 2,
        speed: 2,
        shield: [0, 1, 2],
        attacks: [
          {
            dir: 0,
            strength: 1,
            type: AttackType.MELEE,
          },
          {
            dir: 1,
            strength: 2,
            type: AttackType.MELEE,
          },
          {
            dir: 2,
            strength: 1,
            type: AttackType.MELEE,
          },
        ],
      },
      amount: 1,
    },
    {
      token: {
        name: 'Musclehead',
        speed: 2,
        hp: 1,
        attacks: [{ dir: 1, strength: 2, type: AttackType.MELEE }],
      },
      amount: 2,
    },
    {
      token: {
        name: 'Killer',
        speed: 3,
        enableMovement: true,
        attacks: [{ dir: 0, strength: 1, type: AttackType.SHOT }],
      },
      amount: 2,
    },*/
  ],
    enhancementsTokens: [
   /* {
      token: {
        name: 'Medic',
        hp: 1,
        enhancements: [
          {
            dirs: [0, 1, 2],
            strength: 1,
            type: EnhancementType.HP,
          },
        ],
      },
      amount: 1,
    },
    {
      token: {
        name: 'Officer',
        hp: 1,
        enhancements: [
          {
            dirs: [0, 1, 2],
            strength: 1,
            type: EnhancementType.MELEE,
          },
        ],
      },
      amount: 2,
    },
    {
      token: {
        name: 'Super-officer',
        enhancements: [
          {
            dirs: [0, 1, 2],
            strength: 1,
            type: EnhancementType.HP,
          },
        ],
        hp: 2,
      },
      amount: 1,
    },
    {
      token: {
        name: 'Scout',
        hp: 1,
        enhancements: [
          {
            dirs: [0, 1, 2],
            strength: 1,
            type: EnhancementType.SPEED,
          },
        ],
      },
      amount: 2,
    },*/
  ],
};
