import { ChessConstants } from './constants';
import { Position } from './position';

export class Movement {
  public origin: Position = {} as Position;
  public destination: Position = {} as Position;
  public promotion: string = '';

  constructor(
    str: any,
    dcol: number = 0,
    drow: number = 0,
    promotion: string = ChessConstants.EMPTY_BOX
  ) {
    // 01234 56
    // XN-XN[=C]

    if (typeof str === 'string') {
      this.origin = new Position(str.substring(0, 2));
      this.destination = new Position(str.substring(3, 5));
      if (str.length > 5) {
        this.promotion = str.charAt(6);
      } else this.promotion = ChessConstants.EMPTY_BOX;
    }

    if (typeof str === 'object') {
      this.origin = str;
      this.destination = new Position(
        this.origin.col + dcol,
        this.origin.row + drow
      );
      this.promotion = promotion;
    }
  }

  public isPromotion(): boolean {
    return this.promotion !== ChessConstants.EMPTY_BOX;
  }
}
