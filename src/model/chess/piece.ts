import { Bishop } from './bishop';
import { Board } from './board';
import { ChessConstants } from './constants';
import { King } from './king';
import { Knight } from './Knight';
import { Movement } from './movement';
import { Pawn } from './pawn';
import { Position } from './position';
import { Queen } from './queen';
import { Rook } from './rook';

export class Piece {
  constructor(protected color: number, protected position: Position) {}
  //return the piece's position
  getPosition() {
    return this.position;
  }

  setPosition(position: Position) {
    this.position = position;
  }

  getColor() {
    return this.color;
  }

  public static charToPiece(
    character: string,
    column: number,
    row: number
  ): Piece | null | undefined {
    let color: number =
      character === character.toLocaleLowerCase()
        ? ChessConstants.WHITE
        : ChessConstants.BLACK;

    switch (character.toLocaleLowerCase()) {
      case ChessConstants.ROOK:
        return new Rook(color, new Position(column, row));
      case ChessConstants.QUEEN:
        return new Queen(color, new Position(column, row));
      case ChessConstants.KING:
        return new King(color, new Position(column, row));
      case ChessConstants.KNIGHT:
        return new Knight(color, new Position(column, row));
      case ChessConstants.PAWN:
        return new Pawn(color, new Position(column, row));
      case ChessConstants.BISHOP:
        return new Bishop(color, new Position(column, row));
      case ChessConstants.EMPTY_BOX:
        return null;
    }
  }
}

export interface IPiece {
  canEat: (Board: Board, position: Position) => boolean;

  copy: () => Piece;
  possibleMovements: (board: Board) => Array<Movement>;
  pieceString: () => string;
}
