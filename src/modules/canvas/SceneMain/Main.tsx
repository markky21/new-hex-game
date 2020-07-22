import React, { useState } from 'react';
import { Scene as ThreeScene, ShortType } from 'three';
import { createPortal } from 'react-three-fiber';

import { GameBoard } from './component/GameBoard';
import { Scene } from './component/Scene';

export const Main = (mouseDown: boolean, debug: boolean = true) => {
  const [scene] = useState(() => new ThreeScene());

  return createPortal(
    <Scene debug={debug} scene={scene} mouseDown={mouseDown}>
      <GameBoard debug={debug} />
    </Scene>,
    scene
  );
};
