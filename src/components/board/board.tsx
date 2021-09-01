import React from 'react';
import './Board.scss';
import ChessBoard from '../../assets/img/board.png';
import KingBlack from '../../assets/img/king_dark.png';
import { Board as BoardIns } from '../../model/chess/board';
import { Piece } from '../../model/chess/piece';

export function Board({ board }: { board: BoardIns }) {
  return (
    <h2>
      <div className="board">
        <img src={ChessBoard} style={{ left: 50 }} alt="Chess board"></img>
        <div className="black_king">
          {board.board.map((rows) =>
            rows.map((piece) => {
              const { position } = piece as Piece;
              return (
                <img
                  style={{ top: position.col * 50, left: position.row * 50 }}
                ></img>
              );
            })
          )}
          <img src={KingBlack} alt="King black"></img>
        </div>
      </div>
    </h2>
  );
}
