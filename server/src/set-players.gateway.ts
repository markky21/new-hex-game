import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './services/game.service';
import { Army } from '../../src/models/hex.model';

@WebSocketGateway({ namespace: 'setPlayers' })
export class SetPlayersGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private players: any[] = [];

  constructor(private gameService: GameService) {}

  handleConnection(client: Socket, ...args): any {
    console.log('Connected client', client.id);
    client.emit('playersList', this.players);
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
      this.server.emit('playersList', this.players);
    }
  }

  @SubscribeMessage('joinPlayer')
  handleJoinPlayer(
    @ConnectedSocket() client: Socket,
    @MessageBody() playerData: { name: string; army: Army; color: string },
  ): void {
    this.players.push({ ...playerData, id: client.id });
    client.emit('joinedPlayer', { name: playerData.name });
    this.server.emit('playersList', this.players);
  }

  @SubscribeMessage('playerReady')
  handlePlayerReady(
    @ConnectedSocket() client: Socket,
    @MessageBody() readyMsg: { player: string; ready: boolean; army: Army },
  ): void {
    const playerToConfirm = this.players.find(
      pl => pl.name === readyMsg.player,
    );

    playerToConfirm.ready = true;
    client.emit('ready');
    this.server.emit('playersList', this.players);

    if (
      this.players.length === 3 &&
      this.players.every(player => !!player.ready)
    ) {
      this.server.emit('startTheGame');
    }
  }
}
