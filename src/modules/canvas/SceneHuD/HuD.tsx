import React, { useEffect, useRef, useState } from 'react';
import { OrthographicCamera, Scene as ThreeScene } from 'three';
import { createPortal, useFrame, useThree } from 'react-three-fiber';
import { Scene } from './components/Scene';
import { TokensPanel } from './components/TokensPanel/TokensPanel';

export function Hud(debug?: boolean) {
  const { size } = useThree();
  const [scene] = useState(() => new ThreeScene());

  const camera = useRef<OrthographicCamera>(
    new OrthographicCamera(size.width / -2, size.width / 2, size.height / 2, size.height / -2, -100, 100)
  );

  useEffect(() => {
    camera.current.zoom = 1;
    camera.current.updateProjectionMatrix();
    scene.position.set(0, 0, 10);
  }, [ scene.position]);

  useFrame(({ gl }): void => {
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene, camera.current);
  }, 10);

  return createPortal(
    <Scene debug={debug}>
      <TokensPanel />
    </Scene>,
    scene
  );
}
