import './three-extend';

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas as ThreeCanvas } from 'react-three-fiber';
import { Color, Object3D, PCFSoftShadowMap, Uncharted2ToneMapping, Vector3 } from 'three';

import { Scene } from './components/Scene';
import { GameBoard } from './components/GameBoard';
import { BackgroundBoard } from './components/BackgroundBoard/BackgroundBoard';
import { Effects } from './Effects/Effect';

Object3D.DefaultUp = new Vector3(0, 0, 1);

export const Canvas: React.FC = () => {
  const [hovered, hover] = useState(false);
  const [down, set] = useState(false);
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    document.body.style.cursor = hovered
      ? 'pointer'
      : "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 39 39, auto";
  }, [hovered]);

  return (
    <ThreeCanvas
      orthographic
      style={{ backgroundColor: 'black ' }}
      onCreated={({ gl }) => {
        gl.toneMapping = Uncharted2ToneMapping;
        gl.setClearColor(new Color('#020207'));
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;
        gl.toneMappingExposure = 0.5;
      }}
      onMouseMove={onMouseMove}
      onMouseUp={() => set(false)}
      onMouseDown={() => set(true)}>
      <fog attach="fog" args={[0xffffff, 390, 500]} />

      <Scene>
        <Suspense fallback={null}>
          <BackgroundBoard />
        </Suspense>
        <GameBoard debug={true} />
      </Scene>
      <Effects down={down} />
    </ThreeCanvas>
  );
};
