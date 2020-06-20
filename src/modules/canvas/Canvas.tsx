import React, { useRef, useState } from 'react';
import { Canvas as ThreeCanvas, useFrame } from 'react-three-fiber';

export const Canvas: React.FC = () => {
  return (
    <ThreeCanvas style={{ backgroundColor: 'blue' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <ringBufferGeometry attach="geometry" args={[10, 10, 6]} />
        <meshStandardMaterial color={'red'} wireframe={true} attach={'material'} />
      </mesh>
    </ThreeCanvas>
  );
};
