import './three-extend';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas as ThreeCanvas } from 'react-three-fiber';
import { Color, Object3D, PCFSoftShadowMap, Uncharted2ToneMapping, Vector3 } from 'three';

import { Content } from './components/Content';

Object3D.DefaultUp = new Vector3(0, 0, 1);

interface CanvasProps {
  debug?: boolean;
}
export const Canvas: React.FC<CanvasProps> = ({ debug = true }) => {
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
      <Content />
    </ThreeCanvas>
  );
};
