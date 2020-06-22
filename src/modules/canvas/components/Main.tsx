import React, { Suspense, useState } from 'react';
import { Scene, Vector3 } from 'three';
import { createPortal } from 'react-three-fiber';
import { Lights } from './Lights/Lights';
import { Effects } from '../Effects/Effect';
import { ThreeMonitor } from './ThreeMonitor';
import { BackgroundBoard } from './BackgroundBoard/BackgroundBoard';
import { GameBoard } from './GameBoard';
import { BoardToken } from './BoardToken/BoardTocken';

export function Main(down?: boolean, debug: boolean = true) {
  const [scene] = useState(() => new Scene());
  return createPortal(
    <>
      <axesHelper />
      <Effects scene={scene} down={down} />
      <Lights />
      <ThreeMonitor debug={debug} />
      {/*<CameraControls boundaries={sceneBoundaries} />*/}
      <Suspense fallback={null}>
        <BackgroundBoard />
      </Suspense>
      <Suspense fallback={null}>
        <BoardToken position={new Vector3(0, 0, 0.1)} />
      </Suspense>
      <GameBoard debug={debug} />
    </>,
    scene
  );
}
