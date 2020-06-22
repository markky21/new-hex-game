import {ActionToken, EnhancementToken, SoldierToken} from "../../modules/canvas/components/Token/Token";

export interface ArmyTokenSet {
    actionTokens: { token: ActionToken, amount: number }[];
    soldierTokens: { token: SoldierToken, amount: number }[];
    enhancements: { token: EnhancementToken, amount: number}[];
}