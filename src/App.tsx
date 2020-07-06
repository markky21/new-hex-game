import React from 'react';
import { Canvas } from './modules/canvas/Canvas';

import { InGameUI } from './modules/ui/InGameUI';
import { akitaDevtools } from '@datorama/akita';
import { mainService } from './services/main.service';
import { ApiService } from './services/api.service';
import {SetPlayers} from "./modules/ui/components/GameInit/SetPlayers";

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
      <SetPlayers />
    </>
  );
}

export default App;
