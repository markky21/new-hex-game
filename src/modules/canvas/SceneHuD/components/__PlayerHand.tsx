export const asd = 0;

/*

import React, {Suspense, useEffect, useState} from 'react';
import { Vector3 } from 'three';
import { useFrame, useThree, useUpdate, ReactThreeFiber } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';
import {Token} from "./Token/Token";
import {TokenClass} from "../../../../classes/token.classes";
import { playerService } from "../../../../App";

interface HudParams {
    position: [number,number, number];
}
export const __PlayerHand:React.FC<HudParams> = ({ position }: HudParams = { position: [0,0,0] }) => {
    let hand: TokenClass[];
    let tokenSet: TokenClass[];

    const [ playerServ, setService ] = useState(playerService);
    const { camera, scene } = useThree();
    const [props, set] = useSpring<{
        position: ReactThreeFiber.Vector3;
        rotation: ReactThreeFiber.Vector3;
    }>(() => ({
        position: position,
        rotation: [0, 0, 0],
        config: { mass: 10, friction: 500, tension: 500 }
    }));

    useEffect(() => {
        return () => {
            console.log('set');
            setService(playerService);
            playerServ.getPlayerTokenSet().subscribe((tokens) => {
                console.log('tokeny playera');
                tokenSet = tokens;
                playerService.drawTokens({currentHandAmount: 0}, tokenSet);
            });

            playerServ.getHandTokens().subscribe((tokens) => {
                hand = tokens;
                console.log(hand);
            });
        }

        console.log('jeb');

    });

  useFrame(() => {
      const { x, y, z } = camera.position;
      const { x: rotX, y: rotY, z: rotZ } = camera.rotation;
      set({ position: [0, 0, 0], rotation: [0, 0, 0] });
  });

  const displayTokens = () => {
      const tokens = [];
          for (const el of [0,1,2]) {
              tokens.push(
                  <group key={'token' + el} position={[(el*2) -2, 1, 5]}>
          <pointLight args={['white', 1, 3]} />
              <Suspense fallback={null}>
                  <Token position={ new Vector3(0,1,0)} />
              </Suspense>
          </group>
              )
          }

          return tokens;
  }

  return (
      <a.group position={props.position}>
          <a.group rotation={props.rotation}>
              <group position={position}>
          <mesh position={[0, 0, 5]} rotation={[Math.PI/2, 0, 0]}>
              <ambientLight />
              <boxBufferGeometry attach="geometry" args={[7, 3, 1]} />
              <meshPhongMaterial shininess={0.5} transparent={true} opacity={1} attach="material" color='silver' />
              </mesh>
              { displayTokens() }
              </group>
        </a.group>
      </a.group>
 );
};
*/
