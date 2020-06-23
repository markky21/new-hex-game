import React, { useEffect, useRef, useState } from 'react';
import { Group, OrthographicCamera, Scene } from 'three';
import { createPortal, useFrame, useThree, useUpdate } from 'react-three-fiber';

export function Hud() {
  const { clock } = useThree();
  const [scene] = useState(() => new Scene());

  const groupRef = useRef<Group>();

  const camera = useRef<OrthographicCamera>(new OrthographicCamera(-300, 300, 200, -200, -1000, 1000));
  const [hovered, set] = useState(false);

  useEffect(() => {
    camera.current.zoom = 30;
    camera.current.updateProjectionMatrix();
  }, [camera.current]);

  useFrame(({ gl }): void => {
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene, camera.current);
  }, 10);

  return createPortal(
    <group ref={groupRef}>
      <ambientLight />
      <mesh>
        <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
        <meshStandardMaterial attach="material" color="lightgreen" />
      </mesh>
      <mesh onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
        <sphereBufferGeometry attach="geometry" args={[0.5, 64, 64]} />
        <meshBasicMaterial attach="material" color={hovered ? 'hotpink' : 'black'} />
      </mesh>
    </group>,
    scene
  );
}
