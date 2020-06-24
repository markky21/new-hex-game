import React, { Suspense, useState } from 'react';
import { Scene, Vector3 } from 'three';
import { createPortal } from 'react-three-fiber';
import { Lights } from './Lights/Lights';
import { ThreeMonitor } from './ThreeMonitor';
import { BackgroundBoard } from './BackgroundBoard/BackgroundBoard';
import { GameBoard } from './GameBoard';
import { VFXEffects } from '../VFXEffects/VFXEffect';
import { Token } from './Token/Token';

export function Main(down?: boolean, debug: boolean = true) {
  const [scene] = useState(() => new Scene());
  return createPortal(
    <>
      <axesHelper />
      <VFXEffects scene={scene} down={down} />
      <Lights />
      <ThreeMonitor debug={debug} />
      {/*<CameraControls boundaries={sceneBoundaries} />*/}
      <Suspense fallback={null}>
        <BackgroundBoard />
      </Suspense>
      <Suspense fallback={null}>
        <Token position={new Vector3(0, 0, 0.01)} />
      </Suspense>
      <GameBoard debug={debug} />
    </>,
    scene
  );
}
