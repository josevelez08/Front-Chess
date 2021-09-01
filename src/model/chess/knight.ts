import { Board } from './board';
import { Movement } from './movement';
import { Piece } from './piece';
import { Position } from './position';
import { ChessConstants } from './constants';
import { PiezeLong } from './pieceLong';

export class Knight extends Piece {
  constructor(color: number, position: Position) {
    super(color, position);
  }

  private deltaKnight: number[][] = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
  ];

  public copy(): Piece {
    return new Knight(
      this.color,
      new Position(this.position.col, this.position.row)
    );
  }

  public pieceString(): string {
    return ChessConstants.KNIGHT;
  }

  public possibleMovements(board: Board): Array<Movement> {
    let movements: Array<Movement> = [];
    let possibleCatch: Piece | null;
    let iterator;

    for (iterator = 0; iterator < this.deltaKnight.length; iterator++) {
      if (
        !Board.insideBoard(
          this.position.col + this.deltaKnight[iterator][0],
          this.position.row + this.deltaKnight[iterator][1]
        )
      ) {
        continue;
      }
      possibleCatch = board.getPiece(
        this.position.col + this.deltaKnight[iterator][0],
        this.position.row + this.deltaKnight[iterator][1]
      );
      if (possibleCatch === null || possibleCatch.getColor() != this.color) {
        movements.push(
          new Movement(
            this.position,
            this.deltaKnight[iterator][0],
            this.deltaKnight[iterator][1]
          )
        );
      }
    }
    return movements;
  }

  public canEat(board: Board, delta: Position): boolean {
    const { col, row } = this.position;
    for (let i = 0; i < this.deltaKnight.length; i++) {
      if (
        col + this.deltaKnight[i][0] === delta.col &&
        row + this.deltaKnight[i][1] === delta.row
      ) {
        return true;
      }
    }
    return false;
  }
}
