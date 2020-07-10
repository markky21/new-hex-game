import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './services/game.service';
import { TokenClass } from '../../src/classes/token.classes';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMapTo, tap } from 'rxjs/operators';

@WebSocketGateway({ namespace: 'game' })
export class GameGateway implements OnGatewayDisconnect {
  roundObservable$: BehaviorSubject<void>;
  @WebSocketServer() server: Server;

  constructor(private gameService: GameService) {}

  handleDisconnect(client: any): any {
    this.roundObservable$.complete();
  }

  @SubscribeMessage('startGame')
  handleStartGame(client: Socket, { name, army }): void {
    this.gameService.registerPlayer(client, name, army);
  }

  @SubscribeMessage('startRound')
  handleStartRound(
    client: Socket
  ): Observable<WsResponse<TokenClass[]>> {
    const handTokensSubscription = this.gameService
      .getPlayer(client)
      .getHandTokens$();
    this.roundObservable$ = new BehaviorSubject<void>(null);

    return this.roundObservable$.pipe(
      tap(() => this.gameService.getPlayer(client).drawTokens()),
      switchMapTo(
        handTokensSubscription.pipe(
          map(data => ({ event: 'tokensIncoming', data })),
        ),
      ),
    );
  }

  @SubscribeMessage('gameMove')
  handleGameMove(
    client: Socket,
    move: { token: TokenClass; move?: string },
  ): void {
    this.gameService.getPlayer(client).removeTokenFromHand(move.token);
  }

  @SubscribeMessage('endRound')
  handleEndRound(client: Socket, playerInfo: { player: string }): void {
    this.roundObservable$.complete();
    this.gameService.startNextPlayerRound();
  }
}
