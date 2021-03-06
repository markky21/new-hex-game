import React from 'react';
import { Canvas } from './modules/canvas/Canvas';

import { UI } from './modules/ui/UI';
import { akitaDevtools } from '@datorama/akita';
import { mainService } from './services/main.service';

akitaDevtools();

function useInitializeGame(): void {
  console.log(mainService);
}

function App() {
  useInitializeGame();
  return (
    <>
      <Canvas />
      <UI />
    </>
  );
}

export default App;
