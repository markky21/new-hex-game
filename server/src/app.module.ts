import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetPlayersGateway } from './set-players.gateway';
import { GameGateway } from './game.gateway';
import {GameService} from "./services/game.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GameService, SetPlayersGateway, GameGateway],
})
export class AppModule {}
