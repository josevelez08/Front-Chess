import { Board } from './board';
import { Movement } from './movement';
import { Position } from './position';

export class Piece {
  constructor(protected color: boolean, protected position: string) {}
}

export interface IPiece {
  canEat: (Board: Board, position: Position) => boolean;

  copy: () => Piece;
  possibleMovements: (board: Board) => Array<Movement>;
}
