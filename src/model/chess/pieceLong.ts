import { Board } from './board';
import { Movement } from './movement';
import { IPiece, Piece } from './piece';
import { Position } from './position';
import { ChessConstants } from './constants';

export class PiezeLong extends Piece {
    constructor(position: Position, color: number)
    {
        super(color,position);
    }

    public possibleMovements(board: Board, deltacolumn: number, deltarow: number):Array<Movement>
    {
        const movements:Array<Movement> = [];
       let  movementcol:number = 0;
       let movementrow:number = 0;
       let free:boolean = true;
       let iterator:number;

       for(iterator = 1; free && iterator<ChessConstants.COLS; iterator++)
       {
           movementcol += deltacolumn;
           movementrow += deltarow;
           if(Board.insideBoard(this.position.col+movementcol,this.position.row+movementrow) && board.empty(this.position.col+movementcol,this.position.row+movementrow))
            {
                movements.push(new Movement(this.position,movementcol, movementrow))
            }
            else 
            {
                free = false;
                if(Board.insideBoard(this.position.col+movementcol, this.position.row+movementrow) && board.getPiece(this.position.col+movementcol,this.position.row+movementrow).getColor() != this.color)
                {
                    movements.push(new Movement(this.position,movementcol, movementrow));
                }
            }
       }
       return movements;
    }
    public canEat(board: Board, delta: Position, deltacolum:number, deltarow:number):boolean {
        let column: number = this.position.col;
        let row:number = this.position.row;
        let iterator:number;

        for (iterator=1;iterator<ChessConstants.COLS+1; iterator++)
        {
            column += deltacolum;
            row += deltarow;

            if(!Board.insideBoard(column, row)){
                return false;
            }
            if (column === delta.col && row === delta.row)
            {
                return true;
            }
            if(!board.empty(column,row))
            {
                return false;
            }
        }
        return false;
    }
}