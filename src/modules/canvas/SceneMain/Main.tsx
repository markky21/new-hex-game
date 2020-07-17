import React, { Suspense, useState } from 'react';
import { Vector3, Scene as ThreeScene } from 'three';
import { createPortal } from 'react-three-fiber';

import { GameBoard } from './component/GameBoard';
import { Token } from '../shared/Token/Token';
import { Scene } from './component/Scene';
import { Text } from '../shared/Texts/Text';

export const Main = (mouseDown: boolean, debug: boolean = true) => {
  const [scene] = useState(() => new ThreeScene());

  return createPortal(
    <Scene debug={debug} scene={scene} mouseDown={mouseDown}>
      <GameBoard debug={debug} />

      <Suspense fallback={null}>
        <Text label={'Test'} position={[0, 0 , 0.5]}/>
        <Token token={null} position={new Vector3(0, 0, 0.01)} />
      </Suspense>
    </Scene>,
    scene
  );
};
