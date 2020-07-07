import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class GameGateway {
  @SubscribeMessage('startTheGame')
  handleStartGame(client: any, payload: any): void {
    console.log('starting the game...');
  }
}
