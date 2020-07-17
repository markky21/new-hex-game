import { Player } from '../models/main.model';
import { GameStoreService, gameStoreService } from '../store/game/game-store.service';

class MainService {
  constructor(private gameStoreService: GameStoreService) {

  }

  startTheGame(players: Player[], thisPlayer): void {
    this.gameStoreService.gamestoreStartUpdate({ started: true, players, thisPlayer})
  }
}

export const mainService = new MainService(gameStoreService);
