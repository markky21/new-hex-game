import React, { useRef } from 'react';
import { Euler } from 'three';
import { smallBoard } from '../models/hex.model';

interface GameBoardProps {
  debug?: boolean;
}

const hexRadius = 1;

export const GameBoard: React.FC<GameBoardProps> = ({ debug }) => {
  const hexRotation = useRef(new Euler(0, 0, Math.PI / 6));

  return (
    <group>
      {Object.entries(smallBoard).map(([id, { coordinates }]) => (
        <mesh key={id} position={coordinates} rotation={hexRotation.current}>
          <circleBufferGeometry attach="geometry" args={[hexRadius, 6]} />
          <meshPhongMaterial attach="material" color={'red'} />
        </mesh>
      ))}
    </group>
  );
};
