import React, { useEffect, useRef, useState } from 'react';
import {
  OrthographicCamera,
  Scene as ThreeScene,
} from 'three';
import { createPortal, useFrame, useThree } from 'react-three-fiber';
import { Scene } from './components/Scene';
import { TokensPanel } from './components/TokensPanel/TokensPanel';

export function Hud(debug?: boolean) {
  const { size } = useThree();
  const [scene] = useState(() => new ThreeScene());

  const [camera] = useState<OrthographicCamera>(() => {
    return new OrthographicCamera(size.width / -2, size.width / 2, size.height / 2, size.height / -2, -100, 100)
    // return new PerspectiveCamera(45, size.width / size.height, 1, 1200)
  });

  useEffect(() => {
    scene.position.set(0, -0.32*size.height, 0);
    camera.position.set(0,0,camera.isOrthographicCamera ? 0 : 980);
  }, [scene.position]);

  useFrame(({ gl, mouse }): void => {
    // camera.aspect = size.width/size.height;
    // camera.updateProjectionMatrix();
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene, camera);
  }, 10);

  return createPortal(
    <Scene debug={debug}>
      <group onClick={()=> console.log('panel tokenów')}>
        <TokensPanel />
      </group>
    </Scene>,
    scene
  );
}
