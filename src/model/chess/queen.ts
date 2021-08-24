import { Board } from './board';
import { Movement } from './movement';
import { Piece } from './piece';
import { Position } from './position';
import { ChessConstants } from './constants';
import { PiezeLong } from './pieceLong';

export class Queen extends PiezeLong {
    constructor(color:number,position: Position)
    {
        super(position, color);
    }
    private deltabishop:number[][] = [[1,-1], [1,1], [-1,1], [-1,-1]];
    private deltarook:number[][] = [[1,0],[0,1],[-1,0],[0,-1]];

    public copy():Piece {
        return new Queen(this.color, new Position(this.position.col,this.position.row));
    }
    public pieceString():string{
        return ChessConstants.QUEEN;
    }
    public possibleMovements(board: Board):Array<Movement>{
        let movements:Array<Movement> = [];
        let iterator:number;

        for(iterator=0;iterator<4;iterator++)
        {
         movements = super.possibleMovements(board, this.deltabishop[iterator][0], this.deltabishop[iterator][1]);
         movements = super.possibleMovements(board,this.deltarook[iterator][0],this.deltarook[iterator][1]);
        }
        return movements;
    }
    public canEat(board: Board, delta: Position):boolean{
        let iterator:number;
        for(iterator = 0; iterator < 4; iterator++)
        {
            if(super.canEat(board,delta, this.deltarook[iterator][0],this.deltarook[iterator][1]) || super.canEat(board,delta,this.deltabishop[iterator][0],this.deltabishop[iterator][1])){
                return true;
            }
        }
        return true;
    }
}
