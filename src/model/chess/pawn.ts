import { Board } from './board';
import { Movement } from './movement';
import { IPiece, Piece } from './piece';
import { Position } from './position';

export class Pawn extends Piece implements IPiece {
  public canEat(Board: Board, position: Position): boolean {
    return true;
  }
  public possibleMovements(): Array<Movement> {
    return [];
  }

  public copy(): Piece {
    return {} as Piece;
  }

  pieceString(): string {
    return '';
  }
}
