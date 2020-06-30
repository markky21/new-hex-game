import { useLoader } from 'react-three-fiber';
import { Euler, TextureLoader, Vector3 } from 'three';
import React, { useState } from 'react';

import normalMapTexture from './normal-map-metal.jpg';


interface TokenProps {
  position: Vector3;
  hexRadius?: number
}
export const Token: React.FC<TokenProps> = React.memo(({ position, hexRadius = 1 }) => {
  const normalMap = useLoader(TextureLoader, normalMapTexture);

  const [positionHex] = useState<Vector3>(position);
  const [rotationHex] = useState<Euler>(new Euler(0, 0, Math.PI / 6));
  return (
    <group rotation={rotationHex} position={positionHex}>
      <mesh>
        <circleBufferGeometry attach="geometry" args={[hexRadius, 6]} />
        <meshPhongMaterial attach="material" normalMap={normalMap as any} color={'white'} />
      </mesh>
    </group>
  );
});
