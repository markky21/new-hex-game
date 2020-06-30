import { Army } from '../models/hex.model';
import { PlayerService } from './player.service';

class GameService {
  players = new Map<string, PlayerService>();

  registerPlayer(name: string, army: Army) {
    this.players.set(name, new PlayerService(name, army));
  }
}

export const gameService = new GameService();
