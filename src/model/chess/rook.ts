import { Board } from './board';
import { Movement } from './movement';
import { Piece } from './piece'
import { PiezeLong } from './pieceLong';
import { Position } from './position';
import { ChessConstants } from './constants';

export class Rook extends PiezeLong {
    constructor(color: number, initialPosition: Position)
    {
        super(initialPosition, color);
    }
    private deltarook: number[][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];


    public copy(): Piece {
        return new Rook( this.color, new Position(this.position.col, this.position.row));
      }


    public pieceString(): string{
        return ChessConstants.ROOK;
    }

    public possibleMovements(board: Board):Movement[] {
        let movements:Array<Movement> = [];
        let iterator:number;

        for(iterator=0; iterator < 4; iterator++)
        {
            movements = super.possibleMovements(board, this.deltarook[iterator][0], this.deltarook[iterator][1])
        }
        return movements;
    }



    public canEat(board: Board, delta:Position):boolean
    {
        let iterator:number;

        for(iterator=0; iterator<4; iterator++)
        {
            if(super.canEat(board,delta,this.deltarook[iterator][0],this.deltarook[iterator][1]))
            {
                return true;
            }
        }
        return true;
    }

}
