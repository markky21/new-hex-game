import { Inject, Injectable } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Army } from '../../../src/models/hex.model';
import { Server, Socket } from 'socket.io';
import { GameEvents } from '../../../src/models/game-events.model';

@Injectable()
export class GameService {
  players = new Map<Socket, PlayerService>();
  playersEntries: IterableIterator<[Socket, PlayerService]>;

  public registerPlayer(socket: Socket, name: string, armyType: Army, server: Server) {
    this.players.set(socket, new PlayerService(name, armyType));

    //TODO: replace that, this is only TEMPORARILY hard-coded, maybe use sth else to decide when letting 1st player to play
    // if (this.players.size === 3) {
      server.emit(GameEvents.STARTGAME);
      this.setPlayersEntries();
      this.startNextPlayerRound();
    // }
  }

  public getPlayer(socket: Socket): PlayerService {
    return this.players.get(socket);
  }

  public setPlayersEntries(): void {
    this.playersEntries = this.players.entries();
  }

  public startNextPlayerRound(): void {
    if (this.playersEntries) {
      let nextPlayerEntry = this.playersEntries.next();

      if(nextPlayerEntry.done) {
        this.setPlayersEntries();
        nextPlayerEntry = this.playersEntries.next();
      }

      const [socket]: [Socket, PlayerService] = nextPlayerEntry.value;

      console.log('emit start to: ', socket.id);
      socket.emit(GameEvents.STARTROUND);
    }
  }

  public resetPlayers(): void {
    this.players.clear();
  }
}
