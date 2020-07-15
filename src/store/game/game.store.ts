import { Player } from '../../models/main.model';
import { Store, StoreConfig } from '@datorama/akita';
import { TokenClass } from '../../classes/token.classes';

export interface GameState {
  thisPlayer?: Player;
  started: boolean;
  players?: Player[];
  activePlayer?: Player;
}

export function createInitialGameState(): GameState {
  return {
    thisPlayer: null,
    started: false,
    players: []
  }
}

@StoreConfig({ name: 'game'})
export class GameStore extends Store<GameState> {
  constructor() {
    super(createInitialGameState());
  }

  gameStartUpdate(toState: GameState): void {
    const { started, players, thisPlayer } = toState;

    this.update({ started, players, thisPlayer });
  }

  tokensUpdate(tokens: TokenClass[]): void {
    this.update({ thisPlayer: {...this.getValue().thisPlayer, tokens}});
  }
}

export const gameStore = new GameStore();

