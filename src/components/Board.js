import React from 'react';
import Square from './Square';


export default function Board(props) {

  const renderSquare = (index, winnerSquare) => {
    return (
      <Square
        key={index}
        value={props.squares[index]}
        onClick={() => props.onClick(index)}
        winnerSquare={winnerSquare}
      />
    );
  };

  const renderBoard = () => {
    let index = 0;
    let table = [];
    for (let i=0; i<3; i++){
      let row = [];
      for (let j=0; j<3; j++){
        const winnerSquare = props.winnerSquares.includes(index);
        row.push(renderSquare(index, winnerSquare));
        index = index + 1
      }
      table.push(
        <div
          key={i}
          className="board-row"
        >
          {row}
        </div>)
    }
    return table;
  };

  return (
    <div>{renderBoard()}</div>
  );

}
