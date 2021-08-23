import { Board } from './board';
import { Movement } from './movement';
import { IPiece, Piece } from './piece';
import { Position } from './position';
import { ChessConstants } from './constants';
import { PiezeLong } from './pieceLong';

export class Queen extends PiezeLong {
    constructor(position: Position, color:number)
    {
        super(position, color);
    }
    private deltabishop:number[][] = [[1,-1], [1,1], [-1,1], [-1,-1]];
    private deltarook:number[][] = [[1,0],[0,1],[-1,0],[0,-1]];

    public copy():Piece {
        return new Queen(new Position(this.position.col,this.position.row), this.color);
    }
    public pieceString():string{
        return ChessConstants.QUEEN;
    }
    public possibleMovements(board: Board):Array<Movement>{
        let movements:Array<Movement> = [];
        let iterator:number;

        for(iterator=0;iterator<4;iterator++)
        {
            super.possibleMovements(board)
        }
        return movements;
    }
}
