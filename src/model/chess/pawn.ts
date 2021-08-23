import { Board } from './board';
import { Movement } from './movement';
import { IPiece, Piece } from './piece';
import { Position } from './position';
import { ChessConstants } from './constants';


export class Pawn extends Piece implements IPiece {
  constructor(color:number, position: Position)
  {
    super(color, position);
    position = this.position;
    color = this.color;
  }
  private static rowProgressWhite: number = 1;
  private static rowProgressBlack = ChessConstants.ROWS-2;
  private static rowCrowWhite = ChessConstants.ROWS-1;
  private static rowCrowBlack = 0;
  
  
  
  public copy(): Piece {
    return new Pawn(this.color ,new Position(this.position.col, this.position.row))
  }

  public pieceString(): string {
    return ChessConstants.PAWN;
  }

  public possibleMovements(board: Board): Array<Movement> {
    let movements: Array<Movement> = []; 
    let rowProgress = (this.color==ChessConstants.WHITE) ? Pawn.rowProgressWhite : Pawn.rowProgressBlack;
    let rowCrown = (this.color==ChessConstants.WHITE) ? Pawn.rowCrowWhite : Pawn.rowCrowBlack;

    // normal movement
    if(board.empty(this.position.col,this.position.row + this.color))
    {
      this.increaseMovements(movements, 0, this.color, rowCrown);

      //move 2
      if(this.position.row == rowProgress && board.empty(this.position.col, this.position.row+2*this.color))
      {
        this.increaseMovements(movements, 0, 2*this.color, rowCrown);
      }
    }

    // check right diagonal capture
    if(Board.insideBoard(this.position.col-1,this.position.row+this.color) && 
    board.empty(this.position.col-1, this.position.row+this.color) &&
    board.getPiece(this.position.col - 1, this.position.row+this.color).getColor() != this.color)
    {
        this.increaseMovements(movements, -1, this.color, rowCrown);
    }

    // check left diagonal capture
    if(Board.insideBoard(this.position.col+1,this.position.row+this.color) &&
    ! board.empty(this.position.col+1, this.position.row+this.color) &&
    board.getPiece(this.position.col+1, this.position.row+this.color).getColor() != this.color)
    {
      this.increaseMovements(movements, +1, this.color, rowCrown);
    }
      //HERE I HAVE TO WRITHE THE IN PASSING FUNCTION

    return movements;
  }
  private increaseMovements(movements:Array<Movement>, dx:number, dy:number, rowcrown: number){
  
    if(this.position.row + dy != rowcrown)
    {
      movements.push(new Movement(this.position, dx, dy));
    }
    else {
      if(this.color == ChessConstants.WHITE)
      {
        movements.push(new Movement(this.position, dx, dy, ChessConstants.QUEEN));
        movements.push(new Movement(this.position, dx, dy, ChessConstants.ROOK));
        movements.push(new Movement(this.position,dx,dy,ChessConstants.BISHOP));
        movements.push(new Movement(this.position, dx, dy, ChessConstants.KNIGHT));
      }
      else{
        movements.push(new Movement(this.position, dx, dy, ChessConstants.QUEEN.toUpperCase()));
        movements.push(new Movement(this.position, dx, dy, ChessConstants.ROOK.toUpperCase()));
        movements.push(new Movement(this.position, dx, dy, ChessConstants.BISHOP.toUpperCase()));
        movements.push(new Movement(this.position, dx, dy, ChessConstants.KNIGHT.toUpperCase()));
      }
    }
  }


  public canEat(Board: Board, positionEat: Position): boolean {
    return (this.position.col -1 == positionEat.col || this.position.col +1 == positionEat.col) && (this.position.row+this.color === positionEat.row) ;
  }

}
