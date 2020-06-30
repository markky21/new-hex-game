import { gameService } from './game.service';
import { Army } from '../models/hex.model';

class MainService {
  gameService = gameService;

  // TODO this service should have all logic for managing this application phases
  constructor() {

    // NOTE for development purposes directly initialize player
    gameService.registerPlayer('Desperado', Army.BORGO);
  }
}

export const mainService = new MainService();
