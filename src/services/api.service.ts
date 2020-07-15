import io from 'socket.io-client';
import { GameEvents } from '../models/game-events.model';
import { Player } from '../models/main.model';
import { mainService } from './main.service';
import { gameStore } from '../store/game/game.store';
import { TokenClass } from '../classes/token.classes';

export class ApiService {
  private static instance: ApiService;

  socket = io('http://localhost:3333/');

  constructor() {
    this.openConnection();

    this.socket.on(GameEvents.STARTROUND, (msg) => {
      this.socket.emit(GameEvents.PLAYERROUNDLAUNCH);
    });

    this.socket.on(GameEvents.TOKENSINCOMING, (tokens: TokenClass[]) => {
      console.log('tokens came', tokens);
      gameStore.tokensUpdate(tokens)
    });
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  openConnection(): void {
    this.socket.on('connect', console.log);

    this.socket.on('open', this.onOpen.bind(this));
  }

  onOpen(): void {
    debugger;
    this.socket.on('msgToClient', (data) => {
      console.log({ data });
    });
    this.socket.on('close', () => {});
  }

  dispatchEvent(eventName: GameEvents, callback: Function): void {
    console.log(eventName);
    this.socket.on(eventName, (msg) => callback(msg));
  }

  awaitStartGame(players: Player[], thisPlayer: Player[]): void {
    this.socket.on(GameEvents.STARTGAME, () => mainService.startTheGame(players, thisPlayer))
  }

  emitGameMove(token: TokenClass): void {
    this.socket.emit(GameEvents.GAMEMOVE, { token })
  }
}
