import React, { Suspense, useRef } from 'react';
import { Group, Vector3 } from 'three';
import { useThree } from 'react-three-fiber';
import { Token } from '../../../shared/Token/Token';

const panelHeight = (height) => height * 0.25;

export const TokensPanel: React.FC = React.memo(() => {
  const { size } = useThree();

  const groupRef = useRef<Group>();

  return (
    <group ref={groupRef} position={[0, -size.height / 2 + panelHeight(size.height) / 2, 0]}>
      {/*Panel*/}
      <group>
        <mesh>
          <planeBufferGeometry attach="geometry" args={[size.width * 0.9, panelHeight(size.height)]} />
          <meshBasicMaterial attach="material" color={0xffff00} />
        </mesh>
      </group>

      <group>
        <Suspense fallback={null}>
          <Token hexRadius={size.width * 0.10} position={new Vector3(0, 0, 0.1)} />
        </Suspense>
      </group>
    </group>
  );
});
