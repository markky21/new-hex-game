import React, { useContext } from 'react';
import { useFrame, useThree, useUpdate } from 'react-three-fiber';
import { Box3, MOUSE, OrthographicCamera } from 'three';

import { setViewToBoundaries } from './hooks/use-zooming-nav.hook';
import { OrbitControls } from '../../libs/OrbitControls/OrbitControls';
import { CameraControlContext } from '../../contexts/CameraContext';
import { useSetControlToContext } from './hooks/use-set-control-to-context.hook';

const maxPolarAngle = Math.PI / 4;
const enableDamping = true;
const dampingFactor = 0.05;
const minAzimuthAngle = Math.PI / -3;
const maxAzimuthAngle = Math.PI / 3;

/**
 * Component
 */

interface ICameraControls {
  boundaries: Box3;
}

export const CameraControls: React.FC<ICameraControls> = ({ boundaries }) => {
  const { camera, gl } = useThree();

  const controlsRef = useUpdate<OrbitControls>(
    (controls) => {
      controls.mouseButtons = {
        LEFT: MOUSE.PAN,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.ROTATE,
      };
      setViewToBoundaries(controls, camera as OrthographicCamera, gl, boundaries, true);
    },
    [boundaries, gl.domElement, camera]
  );
  const [, setOrbitControl] = useContext(CameraControlContext);
  useSetControlToContext(controlsRef.current, setOrbitControl);

  useFrame(() => controlsRef.current.update());

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping={enableDamping}
      dampingFactor={dampingFactor}
      minAzimuthAngle={minAzimuthAngle}
      maxAzimuthAngle={maxAzimuthAngle}
      maxPolarAngle={maxPolarAngle}
    />
  );
};
