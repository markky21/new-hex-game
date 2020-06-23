import {
  ArmyTokenSet,
  AttacksClass,
  BoardTokenClass,
  EnhancementClass,
  EnhancementsClass,
  SimpleAttackClass,
  SimpleEnhancementClass,
  SimpleShieldClass,
  SoldierShieldClass,
  TokenSoldierClass,
} from '../../classes/token.classes';
import {AttackType, EnhancementType} from '../hex.model';
import {
  TokenActionBattle,
  TokenActionBomb,
  TokenActionGrenade,
  TokenActionMove,
  TokenActionPush
} from './token-actions.model';


class MolochSoldierBlocker extends TokenSoldierClass {
  shields = new SoldierShieldClass({
    1: new SimpleShieldClass(1)
  });
  board = new BoardTokenClass({ hp: 3, attackRound: [0] });
  name: 'Blocker';
}

class MolochSoldierCyborg extends TokenSoldierClass {
  attacks = new AttacksClass({
    1: new SimpleAttackClass(AttackType.SHOT, 1),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [3] });
  name: 'Cyborg';
}

class MolochSoldierGaussCannon extends TokenSoldierClass {
  attacks = new AttacksClass({
    5: new SimpleAttackClass(AttackType.GAUSS, 1)
  });
  board = new BoardTokenClass({ hp: 2, attackRound: [1] });
  name: 'Gauss Cannon';
}

class MolochSoldierJuggernaut extends TokenSoldierClass {
  attacks = new AttacksClass({
    1: new SimpleAttackClass(AttackType.MELEE, 2),
    2: new SimpleAttackClass(AttackType.SHOT, 1),
  });
  shields = new SoldierShieldClass({
    1: new SimpleShieldClass(1),
    3: new SimpleShieldClass(1),
    5: new SimpleShieldClass(1),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name: 'Juggernaut';
}

class MolochSoldierClown extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 1),
  });
  board = new BoardTokenClass({ hp: 2, attackRound: [2] });
  name: 'Clown';
}

class MolochSoldierHunter extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 1),
    2: new SimpleAttackClass(AttackType.MELEE, 1),
    4: new SimpleAttackClass(AttackType.MELEE, 1),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [3] });
  name: 'Hunter';
}

class MolochSoldierDefender extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.SHOT, 1),
    1: new SimpleAttackClass(AttackType.SHOT, 1),
    2: new SimpleAttackClass(AttackType.SHOT, 1),
  });
  board = new BoardTokenClass({ hp: 2, attackRound: [1] });
  name: 'Defender';
}

class MolochSoldierPanzerHunter extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.MELEE, 1),
    1: new SimpleAttackClass(AttackType.MELEE, 1),
    2: new SimpleAttackClass(AttackType.MELEE, 1),
    3: new SimpleAttackClass(AttackType.MELEE, 1),
    4: new SimpleAttackClass(AttackType.MELEE, 1),
    5: new SimpleAttackClass(AttackType.MELEE, 1),
  });
  shields = new SoldierShieldClass({
    0: new SimpleShieldClass(1),
    1: new SimpleShieldClass(1)
  })
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name: 'Panzer Hunter';
}

class MolochSoldierPanzerWatchmen extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.SHOT, 1),
    1: new SimpleAttackClass(AttackType.SHOT, 1),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name: 'Panzer Watchmen';
}

class MolochSoldierReaper extends TokenSoldierClass {
  attacks = new AttacksClass({
    1: new SimpleAttackClass(AttackType.MELEE, 2),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name: 'Reaper';
}

class MolochSoldierWebmaster extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.NET, 1),
    1: new SimpleAttackClass(AttackType.NET, 1),
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
  name: 'Webmaster';
}

class MolochSoldierStormTrooper extends TokenSoldierClass {
  attacks = new AttacksClass({
    1: new SimpleAttackClass(AttackType.SHOT, 1),
  });
  board = new BoardTokenClass({hp: 2, attackRound: [2, 1]});
  name: 'Storm Trooper'
}

class MolochSoldierWatchman extends TokenSoldierClass {
  attacks = new AttacksClass({
    0: new SimpleAttackClass(AttackType.SHOT, 1),
    2: new SimpleAttackClass(AttackType.SHOT, 1),
  });
  shields = new SoldierShieldClass({
    1: new SimpleShieldClass(1)
  });
  board = new BoardTokenClass({ hp: 1, attackRound: [2] });
}

class MedicEnhancement extends EnhancementsClass {
  enhancements = new EnhancementClass({
    1: new SimpleEnhancementClass(1, EnhancementType.HP),
    3: new SimpleEnhancementClass(1, EnhancementType.HP),
    5: new SimpleEnhancementClass(1, EnhancementType.HP)
  });
  name = 'Medic';
}

class OfficerEnhancement extends EnhancementsClass {
  enhancements = new EnhancementClass({
    0: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    2: new SimpleEnhancementClass(1, EnhancementType.MELEE),
    4: new SimpleEnhancementClass(1, EnhancementType.MELEE)
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
    1: new SimpleEnhancementClass(1, EnhancementType.SPEED),
    3: new SimpleEnhancementClass(1, EnhancementType.SPEED),
    5: new SimpleEnhancementClass(1, EnhancementType.SPEED)
  });
  name = 'Scout';
}

class BrainEnhancement extends EnhancementsClass {
  enhancements = new EnhancementClass({
    1: [new SimpleEnhancementClass(1, EnhancementType.MELEE), new SimpleEnhancementClass(1, EnhancementType.SHOT)],
    3: [new SimpleEnhancementClass(1, EnhancementType.MELEE), new SimpleEnhancementClass(1, EnhancementType.SHOT)],
    5: [new SimpleEnhancementClass(1, EnhancementType.MELEE), new SimpleEnhancementClass(1, EnhancementType.SHOT)]
  });
  name = 'Brain';
}

class MotherEnhancement extends EnhancementsClass {
  enhancements = new EnhancementClass({
    1: new SimpleEnhancementClass(1, EnhancementType.REPEATATTACK)
  });
  name = 'Mother';
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
      amount: 5
    },
    {
      token: TokenActionBomb,
      amount: 1
    }
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
      token: MolochSoldierKiller,
      amount: 2,
    },
      {
        token: MolochSoldierHunter,
        amount: 2
      },
      {
        token: MolochSoldierDefender,
        amount: 1
      },
      {
        token: MolochSoldierPanzerHunter,
        amount: 2
      },
      {
        token: MolochSoldierPanzerWatchmen,
        amount: 1
      },
      {
        token: MolochSoldierReaper,
        amount: 1
      },
      {
        token: MolochSoldierWebmaster,
        amount: 1
      },
      {
        token: MolochSoldierStormTrooper,
        amount: 1
      },
      {
        token: MolochSoldierWatchman,
        amount: 1
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
        amount: 1
      }
  ],
};
