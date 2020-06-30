import React from 'react';
import { Lights } from './Lights/Lights';
import { ThreeMonitor } from '../../shared/DebugTools/ThreeMonitor';
import { useThree } from 'react-three-fiber';

interface SceneProps {
  debug?: boolean;
}

export const Scene: React.FC<SceneProps> = ({ children, debug }) => {
  const { size } = useThree();

  return (
    <>
      {debug && <axesHelper />}
      <ThreeMonitor debug={debug} />

      <Lights />
      <orthographicCamera args={[size.width / -2, size.width / 2, size.height / 2, size.height / -2, -100, 100]} />

      <group position={[0,0,-10]}>{children}</group>
    </>
  );
};
