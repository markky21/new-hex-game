import React, { useRef } from 'react';
import { Group } from 'three';

export const TokensPanel: React.FC = () => {
  const groupRef = useRef<Group>();

  return (
    <group ref={groupRef}>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[5, 5, 32]} />
        <meshBasicMaterial attach="material" color={0xffff00} />
      </mesh>
    </group>
  );
};
