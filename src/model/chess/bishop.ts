import { Board } from './board';
import { Movement } from './movement';
import { Piece } from './piece'
import { PiezeLong } from './pieceLong';
import { Position } from './position';
import { ChessConstants } from './constants';


export class Bishop extends PiezeLong {
    constructor(position: Position, color: number)
    {
        super(position,color);
    }
    private deltabishop:number[][] = [[1,-1], [1,1], [-1,1], [-1,-1]]; 

    public copy():Piece{
        return new Bishop(new Position(this.position.col,this.position.row), this.color);
    }

    public pieceString():string{
        return ChessConstants.BISHOP;
    }

    public possibleMovements(board: Board):Array<Movement>
    {
        let movements:Array<Movement> = [];
        let iterator:number;

        for(iterator=0; iterator<4;iterator++)
        {
            super.possibleMovements(board,this.deltabishop[iterator][0],this.deltabishop[iterator][1])
        }
        return movements;
    }

    public canEat(board: Board, delta:Position): boolean
    {
        let iterator:number;

        for(iterator=0;iterator<4;iterator++)
        {
            if(super.canEat(board,delta,this.deltabishop[iterator][0],this.deltabishop[iterator][1]))
            {
                return true;
            }
        }
        return false;
    }
}
