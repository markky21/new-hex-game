import React from 'react';
import { useFrame, useThree, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';

export let lightRef: THREE.SpotLight;
const lightColor = 0xffa95c;

export const SpotLight: React.FC = React.memo(() => {
  const { scene, clock } = useThree();

  const spotLightRef = useUpdate<THREE.SpotLight>(
    (light) => {
      lightRef = light;
      light.shadow.bias = -0.0001;
      light.shadow.mapSize.width = 1024 * 4;
      light.shadow.mapSize.height = 1024 * 4;
      // console.log({ light });
      // scene.add(new THREE.CameraHelper(light.shadow.camera));
      scene.add(new THREE.SpotLightHelper(light));
    },
    [scene]
  );

  useFrame(() => {
    // const cos = Math.cos(clock.elapsedTime) * 4;
    // const intensity = cos < 0.0 ? 0.0 : cos;
    // spotLightRef.current.intensity = intensity;

    spotLightRef.current.position.set(
      Math.sin(clock.elapsedTime / 128) * 20,
      Math.cos(clock.elapsedTime / 128) * 20 + 5,
      Math.sin(clock.elapsedTime / 128) * 5 + 20
    );
  });

  return <spotLight ref={spotLightRef} args={[lightColor, 4]} castShadow={true} position={[10, 10, 10]} />;
});
