/* eslint @typescript-eslint/no-unused-vars: off */

import { extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ReactThreeFiber } from 'react-three-fiber/three-types';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from './Effects/Glitchpass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
      effectComposer: ReactThreeFiber.Node<EffectComposer, typeof EffectComposer>;
      renderPass: ReactThreeFiber.Node<RenderPass, typeof RenderPass>;
      unrealBloomPass: ReactThreeFiber.Node<UnrealBloomPass, typeof UnrealBloomPass>;
      // @ts-ignore
      glitchPass: ReactThreeFiber.Node<GlitchPass, typeof GlitchPass>;
      shaderPass: ReactThreeFiber.Node<ShaderPass, typeof ShaderPass>;
      afterimagePass: ReactThreeFiber.Node<AfterimagePass, typeof AfterimagePass>;
      filmPass: ReactThreeFiber.Node<FilmPass, typeof FilmPass>;
    }
  }
}

extend({
  AfterimagePass,
  EffectComposer,
  FilmPass,
  GlitchPass,
  OrbitControls,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
});
