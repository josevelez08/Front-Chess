import React from 'react';
import './Board.css';
import ChessBoard from '../../assets/img/chess-board.jpg';
import KingBlack from '../../assets/img/King_black.png';

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
