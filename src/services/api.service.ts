import io from 'socket.io-client';

export class ApiService {
  private static instance: ApiService;

  socket = io('http://localhost:4000/');

  constructor() {
    this.openConnection();
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
}
