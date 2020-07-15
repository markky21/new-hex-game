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
import { Player } from '../../src/models/main.model';
import { GameEvents } from '../../src/models/game-events.model';

@WebSocketGateway()
export class GameGateway implements OnGatewayDisconnect {
  roundObservable$: BehaviorSubject<void>;
  @WebSocketServer() server: Server;

  constructor(private gameService: GameService) {}

  handleDisconnect(client: any): any {
    if (this.roundObservable$) {
      this.roundObservable$.complete();
    }
  }

  @SubscribeMessage(GameEvents.REGISTERPLAYER)
  handleRegisterPlayer(client: Socket, { name, armyType }: Player): void {
    this.gameService.registerPlayer(client, name, armyType, this.server);
  }

  @SubscribeMessage(GameEvents.PLAYERROUNDLAUNCH)
  handleStartRound(
    client: Socket
  ): Observable<WsResponse<TokenClass[]>> {
    const handTokensSubscription = this.gameService
      .getPlayer(client)
      .getHandTokens$();
    this.roundObservable$ = new BehaviorSubject<void>(null);

    console.log('leco tokeny');
    return this.roundObservable$.pipe(
      tap(() => this.gameService.getPlayer(client).drawTokens()),
      switchMapTo(
        handTokensSubscription.pipe(
          map(data => ({ event: GameEvents.TOKENSINCOMING, data })),
        ),
      ),
    );
  }

  @SubscribeMessage(GameEvents.GAMEMOVE)
  handleGameMove(
    client: Socket,
    move: { token: TokenClass; move?: string },
  ): void {
    console.log(move);
    this.gameService.getPlayer(client).removeTokenFromHand(move.token);
  }

  @SubscribeMessage(GameEvents.ENDROUND)
  handleEndRound(client: Socket): void {
    this.roundObservable$.complete();
    this.gameService.startNextPlayerRound();
  }
}
