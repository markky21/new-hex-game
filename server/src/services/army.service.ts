import { Army } from '../../../src/models/hex.model';
import { ArmyTokenSetInstance } from '../../../src/classes/token.classes';
import { ArmyTokensFootprint } from '../../../src/models/Tokens/token.model';

export class ArmyService {
  tokens: ArmyTokenSetInstance = { actionsTokens: null, enhancementsTokens: null, soldiersTokens: null };

  constructor(public armyType: Army) {
    this._createTokenSet();
  }

  private _createTokenSet() {
    const armyFootprint = ArmyTokensFootprint.get(this.armyType);
    Object.entries(armyFootprint).forEach(([tokenGroup, groupEntities]) => {
      groupEntities.forEach(({ amount, token }) => (this.tokens[tokenGroup] = new Array(amount).fill(new token())));
    });
  }
}
