import { ArmyTokenSet, TokenClass} from "../classes/token.classes";
import { shuffleArray } from "../utils/object.utils";

export const PlayerService = {
    createTokenSet(model: ArmyTokenSet) {
        const tokenSet = [];

        Object.values(model).forEach(sets => {
            sets.forEach(set => tokenSet.push(...new Array(set.amount).fill(new set.token())));
        });

        return shuffleArray(tokenSet);
    },

    drawTokens(handInfo: { currentHandAmount: number }, tokenSet: TokenClass[]) {
        const drawedTokens = [];

        for (let drawRound of new Array(3 - handInfo.currentHandAmount)) {
            const randomIndex = Math.round(Math.random() * tokenSet.length);
            drawedTokens.push(...tokenSet.splice(randomIndex, 1));
        }

        return drawedTokens;
    }
}