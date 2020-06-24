import React, {Suspense, useEffect, useRef, useState} from 'react';
import {Group, OrthographicCamera, Scene, Vector3} from 'three';
import { createPortal, useFrame, useThree, useUpdate } from 'react-three-fiber';
import {Token} from "./Token/Token";

export function Hud() {
  const { size } = useThree();
  const [scene] = useState(() => new Scene());
  const groupRef = useRef<Group>();

  const camera = useRef<OrthographicCamera>(new OrthographicCamera(-size.width, size.width, size.height, -size.height, -1000, 1000));
  const [hovered, set] = useState(false);

  useEffect(() => {
    camera.current.zoom = 200;
    camera.current.updateProjectionMatrix();
    scene.position.set(0, -3.2, 0);
  }, [camera.current]);

  useFrame(({ gl }): void => {
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene, camera.current);
  }, 10);

  const createTokens = () => {
      const tokens = [];

          for (const el of [0,1,2]) {
              tokens.push(
                  <group key={'handToken' + el} position={[(el*2) -2, 0, 0]}>
          <pointLight args={['white', 3, 3]} />
              <Suspense fallback={null}>
                  <Token position={ new Vector3(0,0,0)} />
              </Suspense>
          </group>
              )
          }

          return tokens;
  }

  return createPortal(
    <group ref={groupRef}>
      <mesh position={[0, 0,-3]}>
        <boxBufferGeometry attach="geometry" args={[7, 3, 1]} />
        <meshStandardMaterial transparent={true} opacity={0.4} attach="material" color='silver' />
      </mesh>
        { createTokens() }
    </group>,
    scene
  );
}
