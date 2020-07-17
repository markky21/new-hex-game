import React, { useEffect, useRef } from 'react';
import { AttackType } from '../../../../models/hex.model';

export interface AttackTypeIndicator {
  type: AttackType;
  direction: number;
  hexRadius: number;
}

interface MeleeAttackIndicator extends AttackTypeIndicator {
  type: AttackType.MELEE;
}

export const MeleeAttackIndicator: React.FC<MeleeAttackIndicator> = ({direction, hexRadius, type}) => {
  const mesh = useRef(null);
  const side = hexRadius;
  const r = (side * Math.sqrt(3)) /2;
  const rotations = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 2*Math.PI, -Math.PI/3];

  useEffect(() => {
    if (!isNaN(direction)) {
      mesh.current.translateX(Math.cos((direction * Math.PI)/3 - Math.PI/2) * r)
      mesh.current.translateZ(Math.sin((direction * Math.PI)/3  - Math.PI/2) * r)
      mesh.current.rotateY(rotations[direction]);
    }
  }, []);

  return (
    <group key={type + direction}>
      <mesh
        ref={mesh}
        scale={[0.6, 0.6, 0.6]}
        position={[0, 0, 30]}
        rotation={[Math.PI / 2, 0,0 ]}
        >
        <cylinderBufferGeometry attach="geometry" args={[hexRadius/2.5, hexRadius/2.5, 0.2, 3, 1]} />
        <meshStandardMaterial attach="material" color={type === AttackType.MELEE ? 'red' : 'blue'} />
      </mesh>
    </group>
  );
};