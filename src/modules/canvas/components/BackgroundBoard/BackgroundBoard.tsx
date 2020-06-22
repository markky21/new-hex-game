import React, { useRef } from 'react';
import { useLoader, useUpdate } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group, Mesh } from 'three';

const initialScale = 0.2;
const initialRotation = { x: Math.PI / 2, y: Math.PI / 2 + Math.PI / 12, z: Math.PI / -12 };
const initialPositionZ = -4;

function useAfterInit(): React.MutableRefObject<any> {
  const wasInit = useRef<boolean>(false);
  return useUpdate((ref: Group) => {
    ref.scale.setScalar(initialScale);
    ref.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);
    ref.position.setZ(initialPositionZ);

    if (!wasInit.current) {
      wasInit.current = true;
      const models: Mesh[] = ref.children as Mesh[];
      models.forEach((node) =>
        node.traverse((n) => {
          if (n['isMesh']) {
            n.castShadow = true;
            n.receiveShadow = true;
          }
        })
      );
    }
  }, []);
}

export const BackgroundBoard: React.FC = () => {
  const gltf = useLoader(GLTFLoader, '/3d-objects/dp3_homework_9/scene.gltf');

  const modelRef: React.MutableRefObject<any> = useAfterInit();

  return <primitive ref={modelRef} object={gltf.scene} />;
};
