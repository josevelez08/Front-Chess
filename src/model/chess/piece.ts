import { Board } from './board';
import { Movement } from './movement';
import { Position } from './position';

export class Piece {
  constructor(protected color: boolean, protected position: string) {
  }
  //return the piece's position
  getPosition () {
    return this.position;
  }
  setPosition (position2: string)
  {
    this.position = position2;
  }
  getColor() 
  {
    return this.color;
  }
  charToPiece(character: string, column: number, row: number)
  {
    let color = character;

    if(color == color.toLocaleLowerCase())
      { color = 'white' }
    else 
      { color = 'black'}

    switch(character.toLocaleLowerCase()) {
      case 'r':
        return 'R';
      case 'q':
        return 'q';
    }
  }
}


export interface IPiece {
  canEat: (Board: Board, position: Position) => boolean;

  copy: () => Piece;
  possibleMovements: (board: Board) => Array<Movement>;
  piezaChar: () => string;
}
