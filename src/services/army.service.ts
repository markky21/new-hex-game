import { Army } from '../models/hex.model';
import { ArmyTokenSetInstance } from '../classes/token.classes';
import { ArmyTokensFootprint } from '../models/Tokens/token.model';

export class ArmyService {
  tokens: ArmyTokenSetInstance = { actionsTokens: [], enhancementsTokens: [], soldiersTokens: [] };

  constructor(public armyType: Army) {
    this._createTokenSet();
  }

  private _createTokenSet() {
    const armyFootprint = ArmyTokensFootprint.get(this.armyType);

    Object.entries(armyFootprint).forEach(([tokenGroup, groupEntities]) => {
      groupEntities.forEach(({ amount, token }) => (this.tokens[tokenGroup] = [...this.tokens[tokenGroup], ...new Array(amount).fill(new token())]));
    });
  }
}
