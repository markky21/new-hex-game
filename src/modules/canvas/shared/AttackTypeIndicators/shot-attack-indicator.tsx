import React, { useEffect, useRef } from 'react';
import { AttackType } from '../../../../models/hex.model';
import { AttackTypeIndicator } from './melee-attack-indicator';
import { Shape } from 'three';

export interface ShotAttackIndicator extends AttackTypeIndicator {
  type: AttackType.SHOT | AttackType.GAUSS | AttackType.SNIPER;
};

export const ShotAttackIndicator: React.FC<ShotAttackIndicator> = ({direction, hexRadius, type}) => {
  const mesh = useRef(null);
  const side = hexRadius;
  const r = (side * Math.sqrt(3)) /2;
  const shape = new Shape().moveTo( 0, 2 )
    .lineTo( .5, 0 )
    .lineTo( -.5, 0 )
    .lineTo( 0, 2 );
  const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 5, steps: 2, bevelThickness: 1, bevelSize:0 };
  const rotations = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 2*Math.PI, -Math.PI/3];

  useEffect(() => {
    if (!isNaN(direction)) {
      mesh.current.translateX(Math.cos((direction * -Math.PI)/3 + Math.PI/2) * r)
      mesh.current.translateZ(Math.sin((direction * -Math.PI)/3 + Math.PI/2) * r)
      mesh.current.rotateY(rotations[direction]);
    }
  }, []);

  return (
    <group key={type + direction}
    >
      <mesh
        ref={mesh}
        scale={[0.6, 0.6, 0.1]}
        position={[0, 0, 0]}
        >
        <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]} />
        <meshStandardMaterial attach="material" color={type === AttackType.GAUSS ? 'white' : 'red'} />
      </mesh>
    </group>
  )
}