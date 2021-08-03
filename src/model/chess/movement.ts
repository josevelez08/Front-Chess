import { ChessConstants } from './constants';
import { Position } from './position';

export class Movement {
  private origin: Position;
  private destination: Position;
  private promotion: string;

  constructor(str: string) {
    // 01234 56
    // XN-XN[=C]
    this.origin = new Position(str.substring(0, 2));
    this.destination = new Position(str.substring(3, 5));
    if (str.length > 5) {
      this.promotion = str.charAt(6);
    } else this.promotion = ChessConstants.EMPTY_BOX;
  }
}
