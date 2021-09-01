import { ChessConstants } from './constants';
import { Piece } from './piece';

export class King extends Piece {
  public static colDestShort = ChessConstants.COLS - 2;
  public static colDestLarge = 2;

  public static colRookShort = ChessConstants.COLS - 1;

  public static colMediaShort = ChessConstants.COLS - 3;
  public static colRookLarge = 0;
  public static colMediaLarge = 3;
  public static colEmptyLarge = 1;
}
