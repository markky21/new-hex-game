import { Injectable } from '@nestjs/common';
import {PlayerService} from "./player.service";
import {Army} from "../../../src/models/hex.model";

@Injectable()
export class GameService {
  players = new Map<string, PlayerService>();

  public registerPlayer(name: string, army: Army) {
    this.players.set(name, new PlayerService(name, army));
  }
}
