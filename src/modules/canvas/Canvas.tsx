import './three-extend';
import React from 'react';
import { Canvas as ThreeCanvas } from 'react-three-fiber';
import { Scene } from './components/Scene';

export const Canvas: React.FC = () => {
  return (
    <ThreeCanvas style={{ backgroundColor: 'black' }}>
      <Scene>
        <mesh>
          <ringBufferGeometry attach="geometry" args={[10, 10, 6]} />
          <meshStandardMaterial color={'red'} attach={'material'} />
        </mesh>
      </Scene>
    </ThreeCanvas>
  );
};
