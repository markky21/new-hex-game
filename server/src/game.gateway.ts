import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './services/game.service';
import { Army, Token } from '../../src/models/hex.model';
import { TokenClass } from '../../src/classes/token.classes';

@WebSocketGateway( { namespace : 'game'})
export class GameGateway {
  @WebSocketServer() server: Server;

  constructor(private gameService: GameService) {}

  @SubscribeMessage('initialRound')
  handleInitialRound(client: Socket, { player, army }: { player: string, army: Army }): void {
    // draw base token and send to player
  }

  @SubscribeMessage('gameMove')
  handleGameMove(client: Socket, move: { player: 'string', token: TokenClass, move?: string}): void {
    // calculate a move/action on the board and emit message to players
  }

  @SubscribeMessage('endRound')
  handleEndRound(client: Socket, playerInfo : {player: string}): void {
    this.server.emit('beginNextPlayerRound', { player: 'Test1', tokens: []});
  }
}
