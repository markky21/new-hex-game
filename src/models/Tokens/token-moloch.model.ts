import {
  ArmyTokenSet,
  AttacksClass,
  BoardTokenClass,
  SimpleAttackClass,
  SimpleEnhancementClass,
  SimpleShieldClass,
  TokenSoldierClass,
  TokenEnhancementClass, TokenBaseClass,
} from '../../classes/token.classes';
import { AttackType, EnhancementType } from '../hex.model';
import {
  TokenActionBattle,
  TokenActionBomb,
  TokenActionGrenade,
  TokenActionMove,
  TokenActionPush,
} from './token-actions.model';

export class MolochBase extends TokenBaseClass {
  shields = null;
  name = 'MolochBase';
  enableMovement = false;
  enhancements = {
    7: new SimpleEnhancementClass(1, EnhancementType.MELEE),
  };
}

class MolochSoldierBlocker extends TokenSoldierClass {
  name = 'Blocker';
  board = new BoardTokenClass({ hp: 3, attackRound: [0] });
  attacks = {};
  shields = {
    1: new SimpleShieldClass(1),
  };
  enableMovement = false;
}

class MolochSoldierCyborg extends TokenSoldierClass {
  attacks = {
    1: new SimpleAttackClass(AttackType.SHOT, 1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [3] });
  name = 'Cyborg';
  shields = {};
  enableMovement = false;
}

class MolochSoldierGaussCannon extends TokenSoldierClass {
  attacks = {
    5: new SimpleAttackClass(AttackType.GAUSS, 1),
  };
  board = new BoardTokenClass({ hp: 2, attackRound: [1] });
  name = 'Gauss Cannon';
  shields = {};
  enableMovement = false;
}

class MolochSoldierJuggernaut extends TokenSoldierClass {
  attacks = {
    1: new SimpleAttackClass(AttackType.MELEE, 2),
    2: new SimpleAttackClass(AttackType.SHOT, 1),
  };
  shields = {
    1: new SimpleShieldClass(1),
    3: new SimpleShieldClass(1),
    5: new SimpleShieldClass(1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name = 'Juggernaut';
  enableMovement = false;
}

class MolochSoldierClown extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 1),
  };
  board = new BoardTokenClass({ hp: 2, attackRound: [2] });
  name = 'Clown';
  shields = {};
  enableMovement = false;
}

class MolochSoldierHunter extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 1),
    2: new SimpleAttackClass(AttackType.MELEE, 1),
    4: new SimpleAttackClass(AttackType.MELEE, 1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [3] });
  name = 'Hunter';
  shields = {};
  enableMovement = false;
}

class MolochSoldierDefender extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.SHOT, 1),
    1: new SimpleAttackClass(AttackType.SHOT, 1),
    2: new SimpleAttackClass(AttackType.SHOT, 1),
  };
  board = new BoardTokenClass({ hp: 2, attackRound: [1] });
  name = 'Defender';
  shields = {};
  enableMovement = false;
}

class MolochSoldierPanzerHunter extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 1),
    2: new SimpleAttackClass(AttackType.MELEE, 1),
    3: new SimpleAttackClass(AttackType.MELEE, 1),
    4: new SimpleAttackClass(AttackType.MELEE, 1),
    5: new SimpleAttackClass(AttackType.MELEE, 1),
  };
  shields = {
    0: new SimpleShieldClass(1),
    1: new SimpleShieldClass(1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name = 'Panzer Hunter';
  enableMovement = false;
}

class MolochSoldierPanzerWatchmen extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.SHOT, 1),
    1: new SimpleAttackClass(AttackType.SHOT, 1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name = 'Panzer Watchmen';
  shields = {};
  enableMovement = false;
}

class MolochSoldierReaper extends TokenSoldierClass {
  attacks = {
    1: new SimpleAttackClass(AttackType.MELEE, 2),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name = 'Reaper';
  shields = {};
  enableMovement = false;
}

class MolochSoldierWebmaster extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.NET, 1),
    1: new SimpleAttackClass(AttackType.NET, 1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name = 'Webmaster';
  shields = {};
  enableMovement = false;
}

class MolochSoldierStormTrooper extends TokenSoldierClass {
  attacks = {
    1: new SimpleAttackClass(AttackType.SHOT, 1),
  };
  board = new BoardTokenClass({ hp: 2, attackRound: [2, 1] });
  name = 'Storm Trooper';
  shields = {};
  enableMovement = false;
}

class MolochSoldierWatchman extends TokenSoldierClass {
  attacks = {
    0: new SimpleAttackClass(AttackType.SHOT, 1),
    2: new SimpleAttackClass(AttackType.SHOT, 1),
  };
  shields = {
    1: new SimpleShieldClass(1),
  };
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  enableMovement = false;
  name = 'Watchman';
}

class MedicEnhancement extends TokenEnhancementClass {
  enhancements = {
    1: new SimpleEnhancementClass(1, EnhancementType.HP),
    3: new SimpleEnhancementClass(1, EnhancementType.HP),
    5: new SimpleEnhancementClass(1, EnhancementType.HP),
  };
  name = 'Medic';
  board = new BoardTokenClass({});
}

class OfficerEnhancement extends TokenEnhancementClass {
  enhancements = {
    0: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    2: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    4: new SimpleEnhancementClass(1, EnhancementType.MELEE),
  };
  name = 'Officer';
  board = new BoardTokenClass({});
}

class SuperOfficerEnhancement extends TokenEnhancementClass {
  enhancements = {
    0: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    1: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    2: new SimpleEnhancementClass(1, EnhancementType.MELEE),
  };
  name = 'Super-officer';
  board = new BoardTokenClass({ hp: 2, attackRound: [0] });
}

class ScoutEnhancement extends TokenEnhancementClass {
  enhancements = {
    1: new SimpleEnhancementClass(1, EnhancementType.SPEED),
    3: new SimpleEnhancementClass(1, EnhancementType.SPEED),
    5: new SimpleEnhancementClass(1, EnhancementType.SPEED),
  };
  name = 'Scout';
  board = new BoardTokenClass({ hp: 1, attackRound: [0]});
}

class BrainEnhancement extends TokenEnhancementClass {
  enhancements = {
    1: [new SimpleEnhancementClass(1, EnhancementType.MELEE), new SimpleEnhancementClass(1, EnhancementType.SHOT)],
    3: [new SimpleEnhancementClass(1, EnhancementType.MELEE), new SimpleEnhancementClass(1, EnhancementType.SHOT)],
    5: [new SimpleEnhancementClass(1, EnhancementType.MELEE), new SimpleEnhancementClass(1, EnhancementType.SHOT)],
  };
  name = 'Brain';
  board = new BoardTokenClass({});
}

class MotherEnhancement extends TokenEnhancementClass {
  enhancements = {
    1: new SimpleEnhancementClass(1, EnhancementType.REPEATATTACK),
  };
  name = 'Mother';
  board = new BoardTokenClass({});
}

export const TokenMolochModel: ArmyTokenSet = {
  actionsTokens: [
    {
      token: TokenActionBattle,
      amount: 4,
    },
    {
      token: TokenActionMove,
      amount: 1,
    },
    {
      token: TokenActionGrenade,
      amount: 1,
    },
    {
      token: TokenActionPush,
      amount: 5,
    },
    {
      token: TokenActionBomb,
      amount: 1,
    },
  ],
  soldiersTokens: [
    {
      token: MolochSoldierBlocker,
      amount: 2,
    },
    {
      token: MolochSoldierCyborg,
      amount: 4,
    },
    {
      token: MolochSoldierGaussCannon,
      amount: 1,
    },
    {
      token: MolochSoldierJuggernaut,
      amount: 1,
    },
    {
      token: MolochSoldierClown,
      amount: 2,
    },
    {
      token: MolochSoldierHunter,
      amount: 2,
    },
    {
      token: MolochSoldierDefender,
      amount: 1,
    },
    {
      token: MolochSoldierPanzerHunter,
      amount: 2,
    },
    {
      token: MolochSoldierPanzerWatchmen,
      amount: 1,
    },
    {
      token: MolochSoldierReaper,
      amount: 1,
    },
    {
      token: MolochSoldierWebmaster,
      amount: 1,
    },
    {
      token: MolochSoldierStormTrooper,
      amount: 1,
    },
    {
      token: MolochSoldierWatchman,
      amount: 1,
    },
  ],
  enhancementsTokens: [
    {
      token: MedicEnhancement,
      amount: 2,
    },
    {
      token: OfficerEnhancement,
      amount: 1,
    },
    {
      token: BrainEnhancement,
      amount: 1,
    },
    {
      token: ScoutEnhancement,
      amount: 1,
    },
    {
      token: MotherEnhancement,
      amount: 1,
    },
  ],
};
