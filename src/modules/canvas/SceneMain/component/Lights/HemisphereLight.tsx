import React from 'react';
import { useThree, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';

const skyColor = 0xffeeb1;
const groundColor = 0x080820;

export const HemisphereLight: React.FC = React.memo(() => {
  const { scene } = useThree();

  const hemisphereLightRef = useUpdate<THREE.HemisphereLight>(
    (light) => {
      hemisphereLightRef.current.intensity = 1;
    },
    [scene]
  );

  // useFrame(() => {
  //   const cos = Math.cos(clock.elapsedTime) * 4;
  //   const intensity = cos < 0.3 ? 0.3 : cos;
  //   hemisphereLightRef.current.intensity = intensity;
  // });

  return <hemisphereLight ref={hemisphereLightRef} args={[skyColor, groundColor, 0]} />;
});
