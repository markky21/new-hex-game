/* eslint @typescript-eslint/no-unused-vars: off */

import { extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ReactThreeFiber } from 'react-three-fiber/three-types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

extend({ OrbitControls });
