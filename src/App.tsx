import React from 'react';

import { InGameUI } from './modules/ui/InGameUI';
import { akitaDevtools } from '@datorama/akita';
import { SetPlayers } from "./modules/ui/components/SetPlayers/SetPlayers";
import { gameQuery } from './store/game/game.query';
import { useObservable } from 'react-use';
import { Canvas } from './modules/canvas/Canvas';

akitaDevtools();

function useInitializeGame(): void {
  // console.log(mainService);
}

function App() {
  useInitializeGame();

  const gameStarted = useObservable(gameQuery.gameState$, false);

  return (
    <>
      { gameStarted && <Canvas /> }
      { gameStarted && <InGameUI /> }
      {!gameStarted && <SetPlayers /> }
    </>
  );
}

export default App;
