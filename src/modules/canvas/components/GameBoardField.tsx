import React, { useRef } from 'react';
import { Euler } from 'three';
import { BoardFieldInterface } from '../models/hex.model';
import { Text } from './Text';

interface GameBoardFieldProps extends BoardFieldInterface {
  id: string;
  debug?: boolean;
}

const hexRadius = 1;

export const GameBoardField: React.FC<GameBoardFieldProps> = ({ debug, coordinates, id }) => {
  const hexRotation = useRef(new Euler(0, 0, Math.PI / 6));
  return (
    <group>
      <mesh position={coordinates} rotation={hexRotation.current}>
        <circleBufferGeometry attach="geometry" args={[hexRadius, 6]} />
        <meshPhongMaterial attach="material" color={'red'} wireframe={false} />
      </mesh>
      {debug && <Text label={id} position={[coordinates[0], coordinates[1], coordinates[2] + 0.001]} />}
    </group>
  );
};
