import React, {useEffect, useRef, useState} from 'react';
import {Group, PerspectiveCamera, Scene} from 'three';
import {createPortal, useFrame, useThree} from 'react-three-fiber';
import {PlayerHand} from './components/PlayerHand';

export function Hud() {
  const { size } = useThree();
  const [scene] = useState(() => new Scene());
  const groupRef = useRef<Group>();

  const camera = useRef<PerspectiveCamera>(new PerspectiveCamera(55,  size.width/size.height ));

  useEffect(() => {
    camera.current.zoom = 1;
    camera.current.updateProjectionMatrix();
    scene.position.set(0, -5, 0);
  }, [camera.current]);

  useFrame(({ gl }): void => {
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
