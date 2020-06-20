import './three-extend';
import React from 'react';
import { Canvas as ThreeCanvas, useThree } from 'react-three-fiber';

const Scene = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return (
    <>
      <axesHelper />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <ringBufferGeometry attach="geometry" args={[10, 10, 6]} />
        <meshStandardMaterial color={'red'} attach={'material'} />
      </mesh>
      <orbitControls args={[camera, domElement]} />
    </>
  );
};

export const Canvas: React.FC = () => {
  return (
    <ThreeCanvas style={{ backgroundColor: 'blue' }}>
      <Scene />
    </ThreeCanvas>
  );
};
