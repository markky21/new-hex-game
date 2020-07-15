import { Player } from '../models/main.model';
import { gameStore } from '../store/game/game.store';

class MainService {
  constructor() {

  }

  startTheGame(players: Player[], thisPlayer): void {
    gameStore.gameStartUpdate({ started: true, players, thisPlayer})
  }
}

export const mainService = new MainService();
