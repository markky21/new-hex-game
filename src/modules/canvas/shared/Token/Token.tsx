import { useFrame, useLoader } from 'react-three-fiber';
import { Euler, TextureLoader, Vector3 } from 'three';
import React, { useEffect, useRef, useState } from 'react';

import normalMapTexture from './normal-map-metal.jpg';
import { ApiService } from '../../../../services/api.service';
import { Text } from '../Texts/Text';
import { AttackType } from '../../../../models/hex.model';
import { MeleeAttackIndicator } from '../AttackTypeIndicators/melee-attack-indicator';
import { ShotAttackIndicator } from '../AttackTypeIndicators/shot-attack-indicator';

interface TokenProps {
  token: any;
  position: Vector3;
  hexRadius?: number
}
export const Token: React.FC<TokenProps> = React.memo(({ position, hexRadius = 1, token }) => {
  const normalMap = useLoader(TextureLoader, normalMapTexture);
  const [apiService] = useState(ApiService.getInstance());
  const test = useRef();
  const indicators = useRef();

  const [positionHex] = useState<Vector3>(position);
  const [rotationHex] = useState<Euler>(new Euler(0, 0, Math.PI / 6));

  useFrame(() => {
    if (test) {
      // @ts-ignore
      test.current.rotation.z -= 0.01;
    }
  });

  const createTokenAttackIndicators = (attacks) => {
    let attacksDirections: number[] = Object.keys(attacks).map(direction => Number(direction));

    if (attacksDirections.includes(7)) {
      attacksDirections = Array.from({length: 6}, (v,i) => i);
      attacks = Object.fromEntries(attacksDirections.map(direction => [direction, ...Object.values(attacks)]));
    }

    const indicators = [];

    for (let direction of attacksDirections) {
      const attackType = attacks[direction].type;
        switch(attackType) {
          case AttackType.NET:
          case AttackType.MELEE:
            indicators.push(<MeleeAttackIndicator
              //TODO: IMPROVE
              key={attackType+direction}
              type={attackType}
              direction={direction}
              hexRadius={hexRadius} />);
            break;
          case AttackType.SNIPER:
          case AttackType.SHOT:
          case AttackType.GAUSS:
            indicators.push(<ShotAttackIndicator
              key={attackType+direction}
              type={attackType}
              direction={direction}
              hexRadius={hexRadius}
            />);
            break;
        }
    }

    return indicators;
  }

  const createIndicators = (token) => {
    if(token.attacks) {
      return createTokenAttackIndicators(token.attacks);
    } else if (token.enhancements) {
      console.log('enhancement');
    }
  };

  return (
    <group ref={test} onClick={() => apiService.emitGameMove(token)} rotation={rotationHex} position={positionHex}>
      { token && <Text label={token.name} position={[0, 0 , 0.2]}/> }
      <group ref={indicators} scale={[0.8, 0.8, 0.8]}
             rotation={[0, 0, -Math.PI/6]}
      >
      {
        token && createIndicators(token)
      }
      </group>
      <mesh rotation={[Math.PI/2, Math.PI,0]}>
        <cylinderBufferGeometry attach="geometry" args={[hexRadius, hexRadius, 0.2, 6]} />
        <meshPhongMaterial attach="material" normalMap={normalMap as any} color={'white'} />
      </mesh>
    </group>
  );
});
