import { ChessConstants } from './constants';
import { King } from './king';
import { Movement } from './movement';
import { Piece } from './piece';
import { Position } from './position';
import { Pawn } from './pawn';
import { Rook } from './rook';
export class Board {
  // Informacion de estado de un tablero
  public board: Array<Array<Piece | null>> = [];
  private whiteCastling: number;
  private blackCastling: number;
  private inChess: boolean;
  private enPassant: Position | null = null;
  private turn: number;
  private status: ChessConstants;

  // Cosas varias
  /**
   * Devuelve "true" si toca mover a las blancas
   *
   * @return true si juegan blancas
   */
  playWhite(): boolean {
    return this.turn === ChessConstants.WHITE;
  }

  getPiece(col: number, row: number): Piece | null {
    return this.board[row][col];
  }

  setPiece(col: number, row: number, piece: Piece | null): void {
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

  public searchKing(color: number) {
    let actual: Piece | null;
    for (let j = 0; j < ChessConstants.ROWS; j++) {
      for (let i = 0; i < ChessConstants.COLS; i++) {
        actual = this.getPiece(i, j);
        if (
          actual != null &&
          actual instanceof King &&
          actual.getColor() == color
        ) {
          return actual.getPosition();
        }
      }
    }
  }

  /**
   * Ejecuta un movimiento en el tablero, comprobando jaque
   *
   * @param m movimiento a llevar a cabo
   */
  public itMoves(movement: Movement): void {
    this.moveWithoutChess(movement);

    // comprueba si el rey del jugador que debe mover es vulnerable
    const posKing = this.searchKing(this.turn) as Position;
    this.inChess = this.threatenedPiece(
      posKing.col,
      posKing.row,
      this.opposite(this.turn)
    );
  }

  /**
   * Ejecuta un movimiento en el tablero, sin comprobar si lleva a jaque
   *
   * @param m movimiento a ejecutar
   * @return la posición del rey, si ha cambiado, o null si el rey no ha
   * movido
   */

  moveWithoutChess(movement: Movement) {
    let origin: Position = movement.origin;
    let destination: Position = movement.destination;
    let oldEnPassant = this.enPassant;
    let posKing: Position | null = null;
    let moved: Piece | null = this.getPiece(origin.col, origin.row);
    let eaten = this.getPiece(destination.col, destination.row);

    // limpia el origen, la bandera de 'al paso', y cambia el turno
    this.setPiece(origin.col, origin.row, null);
    this.enPassant = null;
    this.turn = this.opposite(this.turn);

    if (moved instanceof Pawn) {
      // Jugadas especiales del peon, todas incompatibles entre sí
      if (movement.isPromotion()) {
        // promocion
        let newPiece = Piece.charToPiece(
          movement.promotion,
          destination.col,
          destination.row
        );
        moved = newPiece;
      } else if (
        oldEnPassant != null &&
        destination.col == oldEnPassant.col &&
        destination.row - (moved.getColor() as number) === oldEnPassant.row
      ) {
        // comer al paso
        this.setPiece(
          destination.col,
          destination.row - (moved.getColor() as number),
          null
        );
      } else if (Math.abs(origin.row - destination.row) > 1) {
        // poner bandera de 'al paso' si avanza dos
        this.enPassant = destination;
      }
    } else if (moved instanceof King) {
      // enroque
      if (Math.abs(origin.col - destination.col) > 1) {
        // mueve la torre
        let colRookOrigin;
        let colRookDestination;
        if (destination.col == King.colDestShort) {
          colRookOrigin = King.colRookShort;
          colRookDestination = King.colMediaShort;
        } else {
          colRookOrigin = King.colRookLarge;
          colRookDestination = King.colMediaLarge;
        }
        const rook = this.getPiece(colRookOrigin, destination.row);
        this.setPiece(colRookDestination, destination.row, rook);
        this.setPiece(colRookOrigin, destination.row, null);
        rook?.setPosition(new Position(colRookDestination, destination.row));
      }

      // una vez movido, el rey no puede enrocar
      if (moved.getColor() === ChessConstants.WHITE) {
        this.whiteCastling = ChessConstants.NO_CASTLING;
      } else {
        this.blackCastling = ChessConstants.NO_CASTLING;
      }

      // actualiza pos. del rey
      posKing = destination;
    } else if (moved instanceof Rook) {
      // una vez se ha movido una torre, no se puede enrocar con ella
      if (origin.col == King.colRookShort) {
        if (moved.getColor() == ChessConstants.WHITE) {
          this.whiteCastling &= ~ChessConstants.CASTLING_KING_SIDE;
        } else {
          this.blackCastling &= ~ChessConstants.CASTLING_KING_SIDE;
        }
      } else if (origin.col == King.colRookLarge) {
        if (moved.getColor() == ChessConstants.WHITE) {
          this.whiteCastling &= ~ChessConstants.CASTLING_QUEEN_SIDE;
        } else {
          this.blackCastling &= ~ChessConstants.CASTLING_QUEEN_SIDE;
        }
      }
    }

    // coloca la pieza movida en su lugar
    this.setPiece(destination.col, destination.row, moved);
    moved?.setPosition(new Position(destination.col, destination.row));

    // comprueba si se ha comido una torre, para inhabilitar el enroque
    if (
      eaten instanceof Rook &&
      (this.blackCastling | this.whiteCastling) != 0
    ) {
      this.cancelCastlingWithoutRook(moved, eaten);
    }

    return posKing;
  }

  threatenedPiece(col: number, row: number, color: number): boolean {
    return false;
  }

  cancelCastlingWithoutRook(moved: Piece | null, eaten: Piece | null) {}

  opposite(turn: number): number {
    return 0;
  }
}
