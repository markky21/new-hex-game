import {TokenClass} from '../../../src/classes/token.classes';
import {Observable, Subject} from 'rxjs';
import {Player} from '../../../src/models/main.model';
import {Army} from '../../../src/models/hex.model';
import {ArmyService} from './army.service';
import {shuffleArray} from "../../../src/utils/object.utils";

export class PlayerService implements Player {
  army: ArmyService;
  set: TokenClass[];
  private currentHandTokens: Subject<TokenClass[]> = new Subject();
  private playerTokenSet: Subject<TokenClass[]> = new Subject();
  private handTokenSet: TokenClass[] = [];

  constructor(public name: string, public armyType: Army) {
    this.army = new ArmyService(armyType);
  }

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

    this.handTokenSet.splice(toRemove, 1);
    this.updateHandTokens();
  }

  updateHandTokens() {
    this.currentHandTokens.next(this.handTokenSet);
  }

  getPlayerTokenSet(): Observable<TokenClass[]> {
    return this.playerTokenSet.asObservable();
  }
}
