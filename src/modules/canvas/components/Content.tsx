import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { PerspectiveCamera, Vector3 } from 'three';
import { Hud } from './HuD';
import { Main } from './Main';

const Controls = () => {
  const { camera, gl } = useThree();
  const ref = useRef();
  // @ts-ignore
  useFrame(() => ref.current.update());
  return <orbitControls ref={ref} target={new Vector3(0, 0, 0)} enableDamping args={[camera, gl.domElement]} />;
};

export const Content: React.FC = () => {
  const { size, setDefaultCamera } = useThree();
  const [camera] = useState(() => {
    const cam = new PerspectiveCamera(55, size.width / size.height);
    cam.position.set(0, 0, 5);
    setDefaultCamera(cam);
    return cam;
  });
  useMemo(() => (camera.aspect = size.width / size.height), [camera.aspect, size.width, size.height]);
  useFrame(() => camera.updateMatrixWorld());

  return (
    <group>
      <Controls />
      // @ts-ignore
      <Main />
      // @ts-ignore
      <Hud />
    </group>
  );
};
