import io from 'socket.io-client';
import { GameEvents } from '../models/game-events.model';
import { Player } from '../models/main.model';
import { mainService } from './main.service';
import { BoardTokenClass, TokenActionClass, TokenClass } from '../classes/token.classes';
import { GameStoreService, gameStoreService } from '../store/game/game-store.service';

export class ApiService {
  private static instance: ApiService;

  socket = io('http://localhost:3333/');

  constructor(private gameStoreService: GameStoreService) {
    this.openConnection();

    this.socket.on(GameEvents.STARTROUND, (msg) => {
      this.socket.emit(GameEvents.PLAYERROUNDLAUNCH);
    });

    this.socket.on(GameEvents.TOKENSINCOMING, (tokens: TokenClass[]) => {
      this.gameStoreService.tokensUpdate(tokens)
    });
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(gameStoreService);
    }

    return ApiService.instance;
  }

  openConnection(): void {
    this.socket.on('connect', console.log);
    this.socket.on('open', this.onOpen.bind(this));
  }

  onOpen(): void {
    this.socket.on('msgToClient', (data) => {
      console.log({ data });
    });
    this.socket.on('close', () => {});
  }

  dispatchEvent(eventName: GameEvents, callback: Function): void {
    this.socket.on(eventName, (msg) => callback(msg));
  }

  awaitStartGame(players: Player[], thisPlayer: Player): void {
    this.socket.on(GameEvents.STARTGAME, () => mainService.startTheGame(players, thisPlayer))
  }

  emitGameMove(token: TokenClass): void {
    this.socket.emit(GameEvents.GAMEMOVE, { token })
  }

  emitRoundEnd(): void {
    this.socket.emit(GameEvents.ENDROUND);
  }
}
