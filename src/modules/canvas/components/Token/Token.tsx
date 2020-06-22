import { useLoader } from 'react-three-fiber';
import { Euler, TextureLoader, Vector3 } from 'three';
import React, { useState } from 'react';

import normalMapTexture from './normal-map-metal.jpg';
import {CommonActions} from "../../../../models/common.actions.model";

const hexRadius = 1;

export enum TokenTypesEnum {
  ACTION = 'ACTIONTOKEN',
  SOLDIER = 'SOLDIER',
  ENHANCEMENT = 'ENHANCEMENT'
}

export type BoardTokenType = TokenTypesEnum.SOLDIER | TokenTypesEnum.ENHANCEMENT;
export type TokenType = TokenTypesEnum.ACTION | BoardTokenType;

export enum AttackTypesEnum {
  MELEE = 'MELEEATTACK',
  SHOT = 'SHOTATTACK',
  GAUSS = 'GAUSSATTACK'
};

export enum EnhancementTypesEnum {
  SPEED = 'SPEED',
  HP = 'HP',
  MELEE = 'MELEE',
  SHOT = 'SHOT'
}

export type AttackTypes = AttackTypesEnum.MELEE | AttackTypesEnum.GAUSS | AttackTypesEnum.SHOT;
export type EnhancementTypes = EnhancementTypesEnum.HP | EnhancementTypesEnum.SHOT | EnhancementTypesEnum.MELEE | EnhancementTypesEnum.SPEED;

export interface Token {
  name?: string;
  type: TokenType;
  enableRotation?: boolean;
  enableMovement?: boolean;
  position?: Vector3;
}

export interface Attack {
  dir: number;
  strength: number;
  type: AttackTypes;
}

export interface Enhancement {
  dirs: number[]
  strength: number;
  type: EnhancementTypes;
}

export class ActionToken implements Token {
  type: TokenTypesEnum.ACTION;
  effect: CommonActions | string;
}

export interface BoardToken extends Token {
  type: BoardTokenType;
  shield? : number[];
  hp: number;
  poisoned?: boolean;
  coughtByNet?: boolean;
}

export interface EnhancementToken extends BoardToken {
  type: TokenTypesEnum.ENHANCEMENT;
  enhancements: Enhancement[];
}

export interface SoldierToken extends BoardToken {
  type: TokenTypesEnum.SOLDIER;
  attacks: Attack[];
  speed: number;
}

export const Token: React.FC<Token> = React.memo(({ position }) => {
  const normalMap = useLoader(TextureLoader, normalMapTexture);

  const [positionHex, ] = useState<Vector3>(position);
  const [rotationHex, ] = useState<Euler>(new Euler(0, 0, Math.PI / 6));
  return (
    <group rotation={rotationHex} position={positionHex}>
      <mesh>
        <circleBufferGeometry attach="geometry" args={[hexRadius, 6]} />
        <meshPhongMaterial attach="material" normalMap={normalMap as any} color={'green'} />
      </mesh>
    </group>
  );
});
