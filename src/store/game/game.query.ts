import { Query } from '@datorama/akita';
import { GameState, gameStore, GameStore } from './game.store';

export class GameQuery extends Query<GameState> {
  gameState$ = this.select('started');
  myPlayerTokens$ = this.select(state => state.thisPlayer.tokens);

  constructor(protected store: GameStore) {
    super(store);
  }
}

export const gameQuery = new GameQuery(gameStore);