import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { PerspectiveCamera, Vector3 } from 'three';
import { Hud } from './HuD';
import { Main } from './Main';
import {Hud2} from "./HuD2";

const Controls = () => {
  const { camera, gl } = useThree();
  const ref = useRef();
  // @ts-ignore
  useFrame(() => ref.current.update());
  return <orbitControls
      ref={ref}
      target={new Vector3(0, -2, 0)}
      enableDamping
      minDistance={1}
      maxDistance={20}
      maxPolarAngle={Math.PI/5}
      minPolarAngle={-Math.PI/5}
      maxAzimuthAngle={Math.PI/6}
      minAzimuthAngle={-Math.PI/6}
      args={[camera, gl.domElement]} />;
};

export const Content: React.FC = () => {
  const { size, setDefaultCamera } = useThree();
  const [camera] = useState(() => {
    const cam = new PerspectiveCamera(55, size.width / size.height);
    cam.position.set(0, -5, 15);
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
      <Hud2 position={[0, -4, -15]} />
      // @ts-ignore
      {/*<Hud />*/}
    </group>
  );
};
