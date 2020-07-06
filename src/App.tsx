import React from 'react';
import { Canvas } from './modules/canvas/Canvas';

import { InGameUI } from './modules/ui/InGameUI';
import { akitaDevtools } from '@datorama/akita';
import { mainService } from './services/main.service';
import { ApiService } from './services/api.service';
import {GameInit} from "./modules/ui/components/GameInit/GameInit";

akitaDevtools();

function useInitializeGame(): void {
  ApiService.getInstance();
  console.log(mainService);
}

function App() {
  useInitializeGame();
  return (
    <>
      {/* <Canvas />*/}
      <InGameUI />
      <GameInit />
    </>
  );
}

export default App;
