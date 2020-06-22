import React, { useRef, useMemo, useEffect } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Vector2 } from 'three';

import { GlitchPass } from './Glitchpass';
import { WaterPass } from './Waterpass';

extend({ EffectComposer, ShaderPass, RenderPass, WaterPass, UnrealBloomPass, FilmPass, GlitchPass });

interface EffectsProps {
  down?: boolean;
}

export const Effects: React.FC<EffectsProps> = ({ down }) => {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
  // @ts-ignore
  useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
  // @ts-ignore
  useFrame(() => composer.current.render(), 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <afterimagePass attachArray="passes" uniforms-damp-value={0.5} />
      <unrealBloomPass attachArray="passes" args={[aspect, 0.8, 1, 0.2]} />
      <filmPass attachArray="passes" args={[0.25, 0.4, 1500, 0]} />
      <glitchPass attachArray="passes" factor={down ? 1 : 0} />
    </effectComposer>
  );
};
