import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Vector2 } from 'three';

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
      <filmPass attachArray="passes" args={[0.15, 0.2, 1500, 0]} />
      {/*<glitchPass attachArray="passes" factor={down ? 1 : 0} />*/}
    </effectComposer>
  );
};
