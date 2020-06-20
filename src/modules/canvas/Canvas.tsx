import './three-extend';
import React from 'react';
import { Canvas as ThreeCanvas } from 'react-three-fiber';
import { Scene } from './components/Scene';
import * as THREE from 'three';

THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

export const Canvas: React.FC = () => {
  return (
    <ThreeCanvas style={{ backgroundColor: 'black ' }}>
      <Scene>
        <mesh>
          <ringBufferGeometry attach="geometry" args={[0.1, 0.1, 6]} />
          <meshStandardMaterial color={'red'} attach={'material'} wireframe={true}/>
        </mesh>
      </Scene>
    </ThreeCanvas>
  );
};
