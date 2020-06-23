import {
  ArmyTokenSet,
  AttacksClass,
  BoardTokenClass,
  EnhancementClass,
  EnhancementsClass,
  SimpleAttackClass,
  SimpleEnhancementClass, SimpleShieldClass, SoldierShieldClass,
  SoldierShotShields,
  TokenSoldierClass,
} from '../../classes/token.classes';
import {AttackType, EnhancementType} from '../hex.model';
import {TokenActionBattle, TokenActionGrenade, TokenActionMove} from './token-actions.model';


class BorgoSoldierMutty extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 1),
    2: new SimpleAttackClass(AttackType.MELEE, 1),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name: 'Mutty';
}

class BorgoSoldierCutler extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    5: new SimpleAttackClass(AttackType.MELEE, 1),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [3] });
  name: 'Cutler';
}

class BorgoSoldierWebmaster extends TokenSoldierClass {
  attacks = new AttacksClass({
    3: [
        new SimpleAttackClass(AttackType.MELEE, 3),
        new SimpleAttackClass(AttackType.NET,1)
    ],
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [1] });
  name: 'Webmaster';
}

class BorgoSoldierSuperMutant extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 2),
    2: new SimpleAttackClass(AttackType.MELEE, 1),
  });
  shields = new SoldierShieldClass({
    0: new SimpleShieldClass(1),
    1: new SimpleShieldClass(1),
    2: new SimpleShieldClass(1)
  });
  board = new BoardTokenClass({ hp: 2, attackRound: [2] });
  name: 'Super-mutant';
}

class BorgoSoldierMusclehead extends TokenSoldierClass {
  attacks = new AttacksClass({
    1: new SimpleAttackClass(AttackType.MELEE, 2),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name: 'Musclehead';
}

class BorgoSoldierKiller extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.SHOT, 1),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [3] });
  name: 'Killer';
  enableMovement: true;
}

class MedicEnhancement extends EnhancementsClass {
  enhancements = new EnhancementClass({
    0: new SimpleEnhancementClass(1, EnhancementType.HP),
    1: new SimpleEnhancementClass(1, EnhancementType.HP),
    2: new SimpleEnhancementClass(1, EnhancementType.HP)
  });
  name = 'Medic';
}

class OfficerEnhancement extends EnhancementsClass {
  enhancements = new EnhancementClass({
    0: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    1: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    2: new SimpleEnhancementClass(1, EnhancementType.MELEE)
  });
  name = 'Officer';
}

class SuperOfficerEnhancement extends EnhancementsClass {
  enhancements = new EnhancementClass({
    0: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    1: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    2: new SimpleEnhancementClass(1, EnhancementType.MELEE)
  });
  name = 'Super-officer';
  board = new BoardTokenClass({ hp: 2, attackRound: [0]});
}

class ScoutEnhancement extends EnhancementsClass {
  enhancements = new EnhancementClass({
    0: new SimpleEnhancementClass(1, EnhancementType.SPEED),
    1: new SimpleEnhancementClass(1, EnhancementType.SPEED),
    2: new SimpleEnhancementClass(1, EnhancementType.SPEED)
  });
  name = 'Scout';
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
    {
      token: BorgoSoldierCutler,
      amount: 4,
    },
    {
      token: BorgoSoldierWebmaster,
      amount: 2,
    },
    {
      token: BorgoSoldierSuperMutant,
      amount: 1,
    },
    {
      token: BorgoSoldierMusclehead,
      amount: 2,
    },
    {
      token: BorgoSoldierKiller,
      amount: 2,
    },
  ],
    enhancementsTokens: [
   {
      token: MedicEnhancement,
      amount: 1,
    },
    {
      token: OfficerEnhancement,
      amount: 2,
    },
    {
      token: SuperOfficerEnhancement,
      amount: 1,
    },
    {
      token: ScoutEnhancement,
      amount: 2,
    },
  ],
};
