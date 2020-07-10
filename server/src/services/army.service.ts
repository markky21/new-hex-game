import { Army } from '../../../src/models/hex.model';
import {
  ArmyTokenSetInstance,
  TokenBaseClass,
} from '../../../src/classes/token.classes';
import {
  ArmyBase,
  ArmyTokensFootprint,
} from '../../../src/models/Tokens/token.model';

export class ArmyService {
  tokens: ArmyTokenSetInstance = {
    actionsTokens: [],
    enhancementsTokens: [],
    soldiersTokens: [],
  };
  private base: TokenBaseClass;

  constructor(public armyType: Army) {
    this._setArmyBase();
    this._createTokenSet();
  }

  private _createTokenSet() {
    const armyFootprint = ArmyTokensFootprint.get(this.armyType);

    Object.entries(armyFootprint).forEach(([tokenGroup, groupEntities]) => {
      groupEntities.forEach(
        ({ amount, token }) =>
          (this.tokens[tokenGroup] = [
            ...this.tokens[tokenGroup],
            ...new Array(amount).fill(new token()),
          ]),
      );
    });
  }

  private _setArmyBase() {
    this.base = ArmyBase.get(this.armyType);
  }

  public getBase() {
    return this.base;
  }
}
