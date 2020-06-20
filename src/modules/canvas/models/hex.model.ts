import { Tokens } from '../../../models/hex.model';
import { Dictionary } from '../../../models/main.model';

export interface FieldEffect {}

export interface BoardFieldInterface {
  coordinates: [number, number, number];
  occupied?: Tokens;
  effects?: FieldEffect;
}

export type BoardInterface = Dictionary<BoardFieldInterface>;

export const smallBoard: BoardInterface = {
  a1: { coordinates: [-2, 3.464101552963257, 0] },
  a2: { coordinates: [-3, 1.7320507764816284, 0] },
  a3: { coordinates: [-4, 0, 0] },
  b1: { coordinates: [0, 3.464101552963257, 0] },
  b2: { coordinates: [-1, 1.7320507764816284, 0] },
  b3: { coordinates: [-2, 0, 0] },
  b4: { coordinates: [-3, -1.7320507764816284, 0] },
  c1: { coordinates: [2, 3.464101552963257, 0] },
  c2: { coordinates: [1, 1.7320507764816284, 0] },
  c3: { coordinates: [0, 0, 0] },
  c4: { coordinates: [-1, -1.7320507764816284, 0] },
  c5: { coordinates: [-2, -3.464101552963257, 0] },
  d2: { coordinates: [3, 1.7320507764816284, 0] },
  d3: { coordinates: [2, 0, 0] },
  d4: { coordinates: [1, -1.7320507764816284, 0] },
  d5: { coordinates: [0, -3.464101552963257, 0] },
  e3: { coordinates: [4, 0, 0] },
  e4: { coordinates: [3, -1.7320507764816284, 0] },
  e5: { coordinates: [2, -3.464101552963257, 0] },
};
