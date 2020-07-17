import { GameState, gameStore, GameStore } from './game.store';
import { BoardTokenClass, TokenClass } from '../../classes/token.classes';

export class GameStoreService {
  constructor(private gameStore: GameStore) {

  }

  gamestoreStartUpdate(toState: GameState): void {
    const { started, players, thisPlayer } = toState;

    this.gameStore.update({ started, players, thisPlayer });
  }

  tokensUpdate(tokens: any[]): void {
    this.gameStore.update({ thisPlayer: {...gameStore.getValue().thisPlayer, tokens}});
  }
}

export const gameStoreService = new GameStoreService(gameStore);