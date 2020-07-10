import { TokenBaseClass, TokenClass } from '../../../src/classes/token.classes';
import {
  BehaviorSubject,
  from,
  interval,
  Observable,
  of,
  pipe,
  Subject,
  zip,
} from 'rxjs';
import { Player } from '../../../src/models/main.model';
import { Army } from '../../../src/models/hex.model';
import { ArmyService } from './army.service';
import { equal, shuffleArray } from '../../../src/utils/object.utils';
import { concatMap, delay } from 'rxjs/operators';

export class PlayerService implements Player {
  army: ArmyService;
  set: TokenClass[];
  base: TokenBaseClass;
  private currentHandTokens: BehaviorSubject<
    TokenClass[]
  > = new BehaviorSubject<TokenClass[]>([]);
  private playerTokenSet: Subject<TokenClass[]> = new BehaviorSubject<
    TokenClass[]
  >([]);
  private handTokenSet: TokenClass[] = [];

  constructor(public name: string, public armyType: Army) {
    this.army = new ArmyService(armyType);

    const { tokens } = this.army;
    const tokensGroupsArray: Array<TokenClass[]> = Object.values(tokens);
    const flatTokensArray = [].concat(...tokensGroupsArray);

    const tokenSet: TokenClass[] = shuffleArray(flatTokensArray);

    this.set = tokenSet;
    this.playerTokenSet.next(tokenSet);
    this.assignBase();
  }

  getBase(): TokenBaseClass {
    this.base = undefined;

    return this.army.getBase();
  }

  assignBase(): void {
    this.base = this.army.getBase();
  }

  drawTokens(): void {
    const drawedTokens = [...this.handTokenSet];

    if (!this.base) {
      for (const drawRound of new Array(3 - this.handTokenSet.length)) {
        const randomIndex = Math.round(Math.random() * this.set.length);
        drawedTokens.push(...this.set.splice(randomIndex, 1));
      }
      this.playerTokenSet.next([...this.set]);
    } else {
      drawedTokens.push(this.getBase());
    }

    this.handTokenSet = drawedTokens;
    this.currentHandTokens.next(drawedTokens);
  }

  getHandTokens$(): Observable<TokenClass[]> {
    return this.currentHandTokens.asObservable();
  }

  getHandTokens(): TokenClass[] {
    return this.handTokenSet;
  }

  removeTokenFromHand(token: TokenClass): void {
    const toRemove = this.handTokenSet.findIndex(
      (element: TokenClass) => equal(token, element),
    );

    this.handTokenSet.splice(toRemove, 1);
    this.updateHandTokens();
  }

  updateHandTokens() {
    this.currentHandTokens.next(this.handTokenSet);
  }

  getPlayerTokenSet$(): Observable<TokenClass[]> {
    return this.playerTokenSet.asObservable();
  }

  getPlayerTokenSet(): TokenClass[] {
    return this.set;
  }
}
