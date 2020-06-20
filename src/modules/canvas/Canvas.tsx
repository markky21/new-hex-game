import './three-extend';
import React from 'react';
import { Canvas as ThreeCanvas } from 'react-three-fiber';
import { Scene } from './components/Scene';
import * as THREE from 'three';
import {GameBoard} from "./components/GameBoard";

THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

export const Canvas: React.FC = () => {
  return (
    <ThreeCanvas style={{ backgroundColor: 'black ' }}>
      <Scene>


          <GameBoard debug={true}/>
      </Scene>
    </ThreeCanvas>
  );
};
