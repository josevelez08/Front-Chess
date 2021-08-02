import React from 'react';
import './Board.css'
import ChessBoard from'./chess-board.jpg'
import KingBlack from'./King_black.png'

export default function Board() {
    return <h2>
      <div id="board">
        <img src={ChessBoard} alt="chess board"></img>
        <div id="black_king">
          <img src={KingBlack} alt="King blach"></img>
        </div>
      </div>
    </h2>;
  } 