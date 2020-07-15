import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './services/game.service';
import { Player } from '../../src/models/main.model';
import { GameEvents } from '../../src/models/game-events.model';

@WebSocketGateway()
export class SetPlayersGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private players: any[] = [];

  constructor(private gameService: GameService) {}

  handleConnection(client: Socket, ...args): any {
    console.log('Connected client', client.id);
    client.emit(GameEvents.PLAYERSLIST, this.players);
  }

  handleDisconnect(client: Socket): any {
    console.log('Disconnected client', client.id);
    const playerToRemoveJoined = this.players.find(
      player => player.id === client.id,
    );

    if (playerToRemoveJoined) {
      const playerToRemove = this.players.findIndex(
        player => player.id === client.id,
      );
      this.players.splice(playerToRemove, 1);
      this.server.emit(GameEvents.PLAYERSLIST, this.players);
    }
  }

  @SubscribeMessage(GameEvents.JOINPLAYER)
  handleJoinPlayer(
    @ConnectedSocket() client: Socket,
    @MessageBody() playerData: Player,
  ): void {
    this.players.push({ ...playerData, id: client.id });
    client.emit(GameEvents.JOINEDPLAYER, { name: playerData.name });
    this.server.emit(GameEvents.PLAYERSLIST, this.players);
  }

  @SubscribeMessage(GameEvents.PLAYERREADY)
  handlePlayerReady(
    @ConnectedSocket() client: Socket,
    @MessageBody() readyMsg: Player,
  ): void {
    const playerToConfirm = this.players.find(
      pl => pl.name === readyMsg.name,
    );

    playerToConfirm.ready = true;
    client.emit(GameEvents.READY);
    this.server.emit(GameEvents.PLAYERSLIST, this.players);

    if (
      this.players.length === 3 &&
      this.players.every(player => !!player.ready)
    ) {
      this.server.emit(GameEvents.GAMEREGISTERPLAYERS);
    }
  }
}
