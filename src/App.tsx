import React from 'react';
import { Canvas } from './modules/canvas/Canvas';
import { PlayerService } from './services/player.service';
import { TokenBorgoModel } from './models/Tokens/token-borgo.model';

import { UI } from './modules/ui/UI';
import { akitaDevtools } from '@datorama/akita';

export const playerService = new PlayerService();

akitaDevtools();

function useInitializeGame(): void {

}

function App() {
  playerService.createTokenSet(TokenBorgoModel);

  return (
    <>
      <Canvas />
      <UI />
    </>
  );
}

export default App;
