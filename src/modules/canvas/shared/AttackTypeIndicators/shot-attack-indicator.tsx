import React, { useEffect, useMemo, useRef } from 'react';
import { AttackType } from '../../../../models/hex.model';
import { AttackTypeIndicator } from './melee-attack-indicator';
import { Shape } from 'three';

export interface ShotAttackIndicator extends AttackTypeIndicator {
  type: AttackType.SHOT | AttackType.GAUSS | AttackType.SNIPER;
};

export const ShotAttackIndicator: React.FC<ShotAttackIndicator> = ({direction, hexRadius, type}) => {
  const indicator = useRef(null);
  const side = useMemo(() => hexRadius, [hexRadius]);
  const r = useMemo(() => (side * Math.sqrt(3)) /2, [side]);
  const shape = new Shape().moveTo( 0, 1.5 )
    .lineTo( .5, -0.5 )
    .lineTo( -.5, -0.5 )
    .lineTo( 0, 1.5 );
  const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 5, steps: 2, bevelThickness: 1, bevelSize:0 };
  const rotations = [Math.PI, 2*Math.PI/3, Math.PI/3, 0, -Math.PI/3, -2*Math.PI/3];

  useEffect(() => {
    if (!isNaN(direction)) {
      indicator.current.translateX(Math.cos((direction * -Math.PI)/3 + Math.PI/2) * r)
      indicator.current.translateY(Math.sin((direction * -Math.PI)/3 + Math.PI/2) * r)
      indicator.current.rotateZ(rotations[direction]);
    }
  }, []);

  return (
    <group key={type + direction}
    >
      <mesh
        ref={indicator}
        scale={[30, 30, 0.1]}
        position={[0, 0, 0]}
        >
        <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]} />
        <meshStandardMaterial attach="material" color={type === AttackType.GAUSS ? 'white' : 'red'} />
      </mesh>
    </group>
  )
}