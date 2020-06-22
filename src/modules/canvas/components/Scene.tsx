import React, { useRef } from 'react';
import { Object3D } from 'three';

import { CameraControls } from './Cameras/CameraControls';
import { useSceneBoundariesHook } from '../hooks/use-scene-boundaries.hook';
import { Lights } from './Lights/Lights';

export const Scene: React.FC = ({ children }) => {
  const groupRef = useRef<Object3D>();
  const sceneBoundaries = useSceneBoundariesHook(groupRef);

  return (
    <group ref={groupRef}>
      <axesHelper />
      <Lights />
      <CameraControls boundaries={sceneBoundaries} />
      {children}
    </group>
  );
};
