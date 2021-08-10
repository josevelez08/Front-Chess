export class Position {
  col: number = 0;
  row: number = 0;

  constructor(col: any, row: number = 0) {
    if (typeof col === 'string') {
      this.col = col.charCodeAt(0) - 'A'.charCodeAt(0);
      this.row = col.charCodeAt(1) - '1'.charCodeAt(0);
    }

    if (typeof col === 'number') {
      this.col = col;
      this.row = row;
    }
  }
}


const myP = new Position("A3");

const myP3 = new Position(1,3);





