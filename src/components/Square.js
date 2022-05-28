import React from 'react';

export default function Square(props) {

  return (
    <button
      className={'square' + (props.winnerSquare ? ' win' : '')}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}
