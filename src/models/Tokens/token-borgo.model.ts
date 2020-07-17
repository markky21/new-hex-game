import {
  ArmyTokenSet,
  BoardTokenClass,
  SimpleAttackClass,
  SimpleEnhancementClass,
  SimpleShieldClass, TokenBaseClass,
  TokenEnhancementClass,
  TokenSoldierClass,
} from '../../classes/token.classes';
import { AttackType, EnhancementType } from '../hex.model';
import { TokenActionBattle, TokenActionGrenade, TokenActionMove } from './token-actions.model';

export class BorgoBase extends TokenBaseClass {
  shields = { };
  name = 'BorgoBase';
  enableMovement = false;
  enhancements = {
    7: new SimpleEnhancementClass(1, EnhancementType.SPEED),
  };
}

class BorgoSoldierMutty extends TokenSoldierClass {
  name = 'Mutty';
  attacks = {
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 1),
    2: new SimpleAttackClass(AttackType.MELEE, 1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  enableMovement = false;
  shields = {};
}

class BorgoSoldierCutler extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    5: new SimpleAttackClass(AttackType.MELEE, 1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [3] });
  name = 'Cutler';
  enableMovement = false;
  shields = {};
}

class BorgoSoldierWebmaster extends TokenSoldierClass {
  attacks = {
    3: [new SimpleAttackClass(AttackType.MELEE, 3), new SimpleAttackClass(AttackType.NET, 1)],
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [1] });
  name = 'Webmaster';
  enableMovement = false;
  shields = {};
}

class BorgoSoldierSuperMutant extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 2),
    2: new SimpleAttackClass(AttackType.MELEE, 1),
  };
  shields = {
    0: new SimpleShieldClass(1),
    1: new SimpleShieldClass(1),
    2: new SimpleShieldClass(1),
  };
  board = new BoardTokenClass({ hp: 2, attackRound: [2] });
  name = 'Super-mutant';
  enableMovement = false;
}

class BorgoSoldierMusclehead extends TokenSoldierClass {
  attacks = {
    1: new SimpleAttackClass(AttackType.MELEE, 2),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name = 'Musclehead';
  enableMovement = false;
  shields = {};
}

class BorgoSoldierKiller extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.SHOT, 1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [3] });
  name = 'Killer';
  enableMovement: true;
  shields = {};
}

class MedicEnhancement extends TokenEnhancementClass {
  enhancements = {
    0: new SimpleEnhancementClass(1, EnhancementType.HP),
    1: new SimpleEnhancementClass(1, EnhancementType.HP),
    2: new SimpleEnhancementClass(1, EnhancementType.HP),
  };
  name = 'Medic';
  board = new BoardTokenClass({ hp: 1, attackRound: [0] });
}

class OfficerEnhancement extends TokenEnhancementClass {
  enhancements = {
    0: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    1: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    2: new SimpleEnhancementClass(1, EnhancementType.MELEE),
  };
  name = 'Officer';
  board = new BoardTokenClass({ hp: 1, attackRound: [0] });
}

class SuperOfficerEnhancement extends TokenEnhancementClass {
  enhancements = {
    0: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    1: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    2: new SimpleEnhancementClass(1, EnhancementType.MELEE),
  };
  name = 'Super-officer';
  board = new BoardTokenClass({ hp: 1, attackRound: [0] });
}

class ScoutEnhancement extends TokenEnhancementClass {
  enhancements = {
    0: new SimpleEnhancementClass(1, EnhancementType.SPEED),
    1: new SimpleEnhancementClass(1, EnhancementType.SPEED),
    2: new SimpleEnhancementClass(1, EnhancementType.SPEED),
  };
  name = 'Scout';
  board = new BoardTokenClass({ hp: 1, attackRound: [0] });
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
