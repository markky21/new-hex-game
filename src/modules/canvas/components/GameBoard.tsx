import React, { useEffect, useMemo, useRef } from 'react';
import { CircleBufferGeometry, Euler, Vector3 } from 'three';

interface GameBoardProps {
  debug?: boolean;
}

const hexRadius = 2;

/**
 * Hooks
 */

function useGetInnerHexCorners(): Array<[number, number, number]> {
  return useMemo(() => {
    const innerGridCorners: Array<[number, number, number]> = [];
    const hexBufferGeometry = new CircleBufferGeometry(hexRadius, 6);
    const innerHexPosition = hexBufferGeometry.getAttribute('position');
    for (let i = 0; i < innerHexPosition.count - 1; i++) {
      innerGridCorners.push([
        innerHexPosition.array[i * 3],
        innerHexPosition.array[i * 3 + 1],
        innerHexPosition.array[i * 3 + 2],
      ]);
    }
    return innerGridCorners;
  }, []);
}

function useGetOuterHexCorners(): Array<[number, number, number]> {
  return useMemo(() => {
    const innerGridCorners: Array<[number, number, number]> = [];
    const hexBufferGeometry = new CircleBufferGeometry(hexRadius * 2, 6);
    const innerHexPosition = hexBufferGeometry.getAttribute('position');
    for (let i = 0; i < innerHexPosition.count - 1; i++) {
      innerGridCorners.push([
        innerHexPosition.array[i * 3],
        innerHexPosition.array[i * 3 + 1],
        innerHexPosition.array[i * 3 + 2],
      ]);
    }
    return innerGridCorners;
  }, []);
}

/**
 * Component
 */
export const GameBoard: React.FC<GameBoardProps> = ({ debug }) => {
  const innerGridCorners = useGetInnerHexCorners();

  const hexRotation = useRef(new Euler(0, 0, Math.PI / 6));
  return (
    <group>
      {innerGridCorners.map((xyz, i) => (
        <mesh key={i} position={xyz} rotation={hexRotation.current}>
          <circleBufferGeometry attach="geometry" args={[hexRadius / 2 , 6]} />
          <meshPhongMaterial attach="material" color={'red'} />
        </mesh>
      ))}
    </group>
  );
};
