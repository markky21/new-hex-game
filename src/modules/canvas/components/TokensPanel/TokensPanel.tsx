import React, { useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Group } from 'three';
import { useCameraPosition } from '../Cameras/hooks/use-camera-position';

export const TokensPanel: React.FC = () => {
  const cameraPosition = useCameraPosition();
  const { camera } = useThree();

  const groupRef = useRef<Group>();

  useFrame(() => {
    if (!groupRef) return;

    groupRef.current.lookAt(camera.position);

    if (cameraPosition) {
      groupRef.current.position.set(
        (cameraPosition.left + (cameraPosition.right - cameraPosition.left) / 2) / cameraPosition.zoom +
          cameraPosition.position.x,
        cameraPosition.bottom / cameraPosition.zoom + cameraPosition.position.y + 2.5,
        cameraPosition.position.z - 10
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[5, 5, 32]} />
        <meshBasicMaterial attach="material" color={0xffff00} />
      </mesh>
    </group>
  );
};
