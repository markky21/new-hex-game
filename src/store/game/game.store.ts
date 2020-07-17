import { Player } from '../../models/main.model';
import { Store, StoreConfig } from '@datorama/akita';

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
}

export const gameStore = new GameStore();

