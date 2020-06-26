import React, {Suspense, useEffect, useRef, useState} from 'react';
import {Group, Scene, Vector3, PerspectiveCamera} from 'three';
import { createPortal, useFrame, useThree, useUpdate } from 'react-three-fiber';
import { PlayerHand } from './PlayerHand';

export function Hud() {
  const { size } = useThree();
  const [scene] = useState(() => new Scene());
  const groupRef = useRef<Group>();

  // const camera = useRef<OrthographicCamera>(new OrthographicCamera(-size.width, size.width, size.height, -size.height, -1000, 1000));
  const camera = useRef<PerspectiveCamera>(new PerspectiveCamera(55,  size.width/size.height ));
  const [hovered, set] = useState(false);

  useEffect(() => {
    camera.current.zoom = 1;
    camera.current.updateProjectionMatrix();
    scene.position.set(0, -5, 0);
  }, [camera.current]);

  useFrame(({ gl }): void => {
    camera.current.aspect = size.width/size.height;
    camera.current.updateProjectionMatrix();
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene, camera.current);
  }, 10);

  return createPortal(
    <group ref={groupRef}>
      <PlayerHand position={[0, 0, -18]} />
    </group>,
    scene
  );
}
