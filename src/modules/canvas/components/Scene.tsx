import { useThree } from 'react-three-fiber';
import React from 'react';

export const Scene: React.FC = ({ children }) => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return (
    <>
      <axesHelper />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <orbitControls args={[camera, domElement]} />
      {children}
    </>
  );
};
