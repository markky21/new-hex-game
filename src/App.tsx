import React from 'react';
import { Canvas } from './modules/canvas/Canvas';
import {PlayerService} from "./services/player.service";
import {TokenBorgoModel} from "./models/Tokens/token-borgo.model";

export const playerService = new PlayerService();

function App() {
  playerService.createTokenSet(TokenBorgoModel);

  return (
      <Canvas />
  );
}

export default App;
