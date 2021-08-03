import React from 'react';
import './Board.scss';
import ChessBoard from '../../assets/img/board.png';
import KingBlack from '../../assets/img/king_dark.png';

export function Board() {
  return (
    <h2>
      <div className="board">
        <img src={ChessBoard} alt="Chess board"></img>
        <div className="black_king">
          <img src={KingBlack} alt="King black"></img>
        </div>
      </div>
    </h2>
  );
}
