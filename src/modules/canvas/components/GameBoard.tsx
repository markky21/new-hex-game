import React from 'react';
import { smallBoard } from '../models/hex.model';
import { GameBoardField } from './GameBoardField';

interface GameBoardProps {
  debug?: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ debug }) => {
  return (
    <group>
      {Object.entries(smallBoard).map(([id, { coordinates }]) => (
        <GameBoardField key={id} debug={debug} coordinates={coordinates} id={id} />
      ))}
    </group>
  );
};
