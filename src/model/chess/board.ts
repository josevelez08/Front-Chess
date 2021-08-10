import { ChessConstants } from './constants';
import { Piece } from './piece';
import { Position } from './position';

export class Board {
  // Informacion de estado de un tablero
  private board: Piece[][];
  private whiteCastling: string;
  private blackCastling: string;
  private inCheck: boolean;
  private enPassant: Position = null;
  private turn: number;
  private status: ChessConstants;

  // Cosas varias
  /**
   * Devuelve "true" si toca mover a las blancas
   *
   * @return true si juegan blancas
   */
  playWhite(): boolean {
    return this.turn == ChessConstants.WHITE;
  }

  getPiece(col: number, row: number): Piece {
    return this.board[row][col];
  }

  setPiece(col: number, row: number, piece: Piece): void {
    this.board[row][col] = piece;
  }

  public static insideBoard(col: number, row: number): boolean {
    return (
      row >= 0 &&
      row < ChessConstants.ROWS &&
      col >= 0 &&
      col < ChessConstants.COLS
    );
  }

  public empty(col: number, row: number): boolean {
    return !!this.getPiece(col, row);
  }

  public putPieces(s: string) {
    let piece: Piece | null | undefined;
    for (let j = 0; j < ChessConstants.ROWS; j++) {
      for (let i = 0; i < ChessConstants.COLS; i++) {
        piece = Piece.charToPiece(s.charAt(j * ChessConstants.COLS + i), i, j);
        this.setPiece(i, j, piece as Piece);
      }
    }
  }
}
