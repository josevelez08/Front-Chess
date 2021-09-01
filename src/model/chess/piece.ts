import { Bishop } from './bishop';
import { Board } from './board';
import { ChessConstants } from './constants';
import { King } from './king';
import { Knight } from './knight';
import { Movement } from './movement';
import { Pawn } from './pawn';
import { Position } from './position';
import { Queen } from './queen';
import { Rook } from './rook';

export class Piece {
  constructor(protected color: number, public position: Position) {}
  //return the piece's position
  getPosition(): Position {
    return this.position;
  }

  public setPosition(position: Position): void | null | undefined {
    this.position = position;
  }

  public getColor(): number | null | undefined {
    return this.color;
  }

  public static charToPiece(
    character: string,
    column: number,
    row: number
  ): Piece | null {
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
    return null;
  }
  public static pieceString(piece: Piece & IPiece) {
    if (piece == null) {
      return ChessConstants.EMPTY_BOX;
    }
    return piece.color === ChessConstants.WHITE
      ? piece.pieceString()
      : piece.pieceString().toUpperCase();
  }
}

export interface IPiece {
  canEat: (Board: Board, position: Position) => boolean;

  copy: () => Piece;
  possibleMovements: (board: Board) => Array<Movement>;
  pieceString: () => string;
}
