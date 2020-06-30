import React from 'react';
import { Canvas } from './modules/canvas/Canvas';
import { UI } from './modules/ui/UI';

import { akitaDevtools } from '@datorama/akita';

akitaDevtools();

function App() {
  return (
    <>
      <Canvas />
      <UI />
    </>
  );
}

export default App;
