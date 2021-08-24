import { Board } from './board';
import { Movement } from './movement';
import { Piece } from './piece';
import { Position } from './position';
import { ChessConstants } from './constants';
import { PiezeLong } from './pieceLong';

export class Knight extends Piece {
    constructor(color:number, position: Position){
        super(color, position);
    }

    private deltaknight:number[][] = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];

    public copy():Piece{
        return new Knight(this.color, new Position(this.position.col,this.position.row));
    }

    public pieceString():string {
        return ChessConstants.KNIGHT;
    }

    public possibleMovements(board: Board):Array<Movement>{
        let movements:Array<Movement> = [];
        let possibleCatch:Piece;
        let iterator;

        for(iterator = 0; iterator < this.deltaknight.length; iterator++)
        {
            if(!Board.insideBoard(this.position.col + this.deltaknight[iterator][0], this.position.row + this.deltaknight[iterator][1]))
            {
                continue;
            }
            possibleCatch = board.getPiece(this.position.col + this.deltaknight[iterator][0], this.position.row + this.deltaknight[iterator][1])
            if(possibleCatch === null || possibleCatch.getColor() != this.color)
            {
                movements.push(new Movement(this.position, this.deltaknight[iterator][0],this.deltaknight[iterator][1]));
            }
        }
        return movements;
    }

    public canEat(board: Board, delta: Position):boolean{

        return ( (this.position.col - 1 === delta.col && this.position.row - 2 === delta.row ) || 
                (this.position.col + 1 === delta.col && this.position.row - 2 === delta.row) || 
                (this.position.col + 2 === delta.col && this.position.row - 1 === delta.row) || 
                (this.position.col + 2 === delta.col && this.position.row + 1 === delta.row) ||
                (this.position.col + 1 === delta.col && this.position.row + 2 === delta.row) ||
                (this.position.col - 1 === delta.col && this.position.row + 2 === delta.row) ||
                (this.position.col - 2 === delta.col && this.position.row + 1 === delta.row) ||
                (this.position.col - 2 === delta.col && this.position.row - 1 === delta.row)
        );
    }
}
