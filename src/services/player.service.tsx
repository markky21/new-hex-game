import { ArmyTokenSet, TokenClass} from "../classes/token.classes";
import { shuffleArray } from "../utils/object.utils";
import { Observable, Subject} from "rxjs";

export const PlayerService = (props) => {
    private currentHandTokens: Subject<TokenClass[]> = new Subject();
    private playerTokenSet: Subject<TokenClass[]> = new Subject();
    private handTokenSet: TokenClass[] = [];

    createTokenSet(model: ArmyTokenSet): void {
        const tokenSet = [];

        Object.values(model).forEach(sets => {
            sets.forEach(set => tokenSet.push(...new Array(set.amount).fill(new set.token())));
        });

        this.playerTokenSet.next(shuffleArray(tokenSet));
    };

    drawTokens(handInfo: { currentHandAmount: number }, tokenSet: TokenClass[]): void {
        console.log('jeb');
        const drawedTokens = [];

        for (let drawRound of new Array(3 - handInfo.currentHandAmount)) {
            const randomIndex = Math.round(Math.random() * tokenSet.length);
            drawedTokens.push(...tokenSet.splice(randomIndex, 1));
        }

        this.playerTokenSet.next([...tokenSet]);
        this.handTokenSet = drawedTokens;
        this.currentHandTokens.next(drawedTokens);
    }

    getHandTokens(): Observable<TokenClass[]> {
        return this.currentHandTokens.asObservable();
    }

    removeTokenFromHand(token: TokenClass): void {
        const toRemove = this.handTokenSet.findIndex((elements: TokenClass) => token === elements);

        this.handTokenSet.splice(toRemove,1);
        this.updateHandTokens();
    }

    updateHandTokens() {
        this.currentHandTokens.next(this.handTokenSet);
    }

    getPlayerTokenSet(): Observable<TokenClass[]> {
        return this.playerTokenSet.asObservable();
    }
}