import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Scene, Vector2 } from 'three';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

interface EffectsProps {
  down?: boolean;
  scene: Scene;
}

export const Effects: React.FC<EffectsProps> = ({ scene, down }) => {
  const composer = useRef();
  const { gl, size, camera } = useThree();
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
  // @ts-ignore
  useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
  // @ts-ignore
  useFrame(() => composer.current.render(), 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      {scene && (
        <>
          <renderPass attachArray="passes" scene={scene} camera={camera} />
          <afterimagePass attachArray="passes" uniforms-damp-value={0.5} />
          <unrealBloomPass attachArray="passes" args={[aspect, 0.8, 1, 0.2]} />
          <filmPass attachArray="passes" args={[0.15, 0.2, 1500, 0]} />
          {/*<glitchPass attachArray="passes" factor={down ? 1 : 0} />*/}
        </>
      )}
    </effectComposer>
  );
};
