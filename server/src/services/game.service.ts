import { Injectable } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Army } from '../../../src/models/hex.model';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
export class GameService {
  @WebSocketServer() server: Server;

  players = new Map<Socket, PlayerService>();
  playersEntries: IterableIterator<[Socket, PlayerService]>;

  public registerPlayer(socket: Socket, name: string, army: Army) {
    this.players.set(socket, new PlayerService(name, army));

    //TODO: replace that, this is only TEMPORARILY hard-coded, maybe use sth else to decide when letting 1st player to play
    if (this.players.size === 3) {
      this.setPlayersEntries();
      this.startNextPlayerRound();
    }
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
      socket.emit('roundStart');
    }
  }
}
