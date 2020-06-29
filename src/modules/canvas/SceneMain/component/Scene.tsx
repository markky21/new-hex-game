import React, { Suspense, useRef } from 'react';
import { Object3D, Scene as ThreeScene } from 'three';

import { CameraControls } from './Cameras/CameraControls';
import { useSceneBoundariesHook } from '../../hooks/use-scene-boundaries.hook';
import { Lights } from './Lights/Lights';
import { ThreeMonitor } from '../../shared/DebugTools/ThreeMonitor';
import { BackgroundBoard } from './BackgroundBoard/BackgroundBoard';
import { VFXEffects } from '../../VFXEffects/VFXEffect';

interface SceneProps {
  debug?: boolean;
  scene: ThreeScene;
  mouseDown: boolean;
}

export const Scene: React.FC<SceneProps> = ({ children, debug, scene, mouseDown }) => {
  const groupRef = useRef<Object3D>();

  const sceneBoundaries = useSceneBoundariesHook(groupRef);

  return (
    <>
      {debug && <axesHelper />}
      <ThreeMonitor debug={debug} />

      <Lights />
      <CameraControls />

      <Suspense fallback={null}>
        <BackgroundBoard />
      </Suspense>

      <group ref={groupRef}>{children}</group>

      <VFXEffects scene={scene} down={mouseDown} />
    </>
  );
};
