import React, { useMemo, useState } from 'react';
import { useFrame, useThree, useUpdate } from 'react-three-fiber';
import { MOUSE, PerspectiveCamera, Vector3 } from 'three';

import { OrbitControls } from '../../../libs/OrbitControls/OrbitControls';
import { useSetControlToContext } from './hooks/use-set-control-to-context.hook';

const dampingFactor = 0.05;
const target = new Vector3(0, -2, 0);
const initCameraPosition: [number, number, number] = [0, -5, 15];
/**
 * Component
 */

interface ICameraControls {}

export const CameraControls: React.FC<ICameraControls> = React.memo(
  () => {
    const { gl, size, setDefaultCamera } = useThree();

    const [camera] = useState(() => {
      const cam = new PerspectiveCamera(55, size.width / size.height);
      cam.position.set(...initCameraPosition);
      setDefaultCamera(cam);
      return cam;
    });
    useMemo(() => (camera.aspect = size.width / size.height), [camera.aspect, size.width, size.height]);

    const controlsRef = useUpdate<OrbitControls>((controls) => {
      controls.mouseButtons = {
        LEFT: MOUSE.PAN,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.ROTATE,
      };
    }, []);

    useSetControlToContext(controlsRef.current);

    useFrame(() => controlsRef.current.update());

    return (
      <orbitControls
        ref={controlsRef}
        dampingFactor={dampingFactor}
        target={target}
        enableDamping
        minDistance={1}
        maxDistance={20}
        maxPolarAngle={Math.PI / 5}
        minPolarAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 6}
        minAzimuthAngle={-Math.PI / 6}
        args={[camera, gl.domElement]}
      />
    );
  },
  () => true
);
