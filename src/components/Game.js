import React, { useState } from 'react';
import Board from './Board';
import Toggle from './Toggle';

export default function Game() {

  const [state, setState] = useState({
    history: [{
      squares: Array(9).fill(null), // tablero completo en el historial
      move: null, // registra el index dentro del array de la ultima jugada
      order: 0 // almacena el orden de la jugada
    }],
    xIsNext: true, // Si X es la siguiente juagada o no
    stepNumber: 0, // numero de la jugada dentro del historial
    orderDesc: false // Si el historial está ordenado de forma Descendente o no
  });

  const calculateWinner = (squares) => {
    const lines = [ // Array de posiciones de juego ganado
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          player: squares[a], // devuelve cual ganó X u O
          squares: lines[i] // Devuelve los index de los cuadros ganadores
        };
      }
    }
    return null;
  };

  const handleClick = (index) => {

    //const history = state.history.slice(0, state.stepNumber + 1);
    const history = state.history.slice(
      (!state.orderDesc
        ? 0
        : state.stepNumber),
      (!state.orderDesc
        ? state.stepNumber + 1
        : state.history.length)
    );

    const current = history[!state.orderDesc ? history.length - 1 : 0];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = state.xIsNext ? 'X' : 'O';

    const newHistory = [{
      squares: squares,
      move: index,
      order: history.length
    }];

    setState({
      ...state,
      history: !state.orderDesc ? history.concat(newHistory) : newHistory.concat(history),
      xIsNext: !state.xIsNext,
      stepNumber: !state.orderDesc ? history.length : 0
    })
  };

  const jumpTo = (step) => {
    setState({
      ...state,
      xIsNext: (step % 2) === 0,
      stepNumber: step
    });
  };

  const getPosition = (index) => {
    const positions = ['1,1', '1,2', '1,3', '2,1', '2,2', '2,3', '3,1', '3,2', '3,3'];
    return positions[index];
  };

  /*// Metodo a pedal usando sort()
  const orderListAsc = (desc) => {
    let history = state.history;
    let stepNumber = (history.length - 1) - state.stepNumber;
    const current = history[state.stepNumber];
    if (desc) {
      history = history.sort((a, b) => a.order > b.order);
    } else {
      history = history.sort((a, b) => a.order < b.order);
    }
    setState({
      ...state,
      history: history,
      stepNumber: stepNumber
    })
  };*/

  // Metodo mas simple usando reverse()
  const orderListAsc = (desc) => {
    let history = state.history;
    let stepNumber = (history.length - 1) - state.stepNumber;
    history = history.reverse();
    setState({
      ...state,
      history: history,
      stepNumber: stepNumber,
      orderDesc: desc
    })
  };

  const renderGame = () => {

    const history = state.history;
    const current = history[state.stepNumber];

    let status;
    const winner = calculateWinner(current.squares);

    if (winner) {
      status = 'Winner: ' + winner.player;
    } else {
      if (history.length < 10) {
        status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
      } else {
        status = 'This is a tie';
      }
    }

    const moves = history.map((hist, index) => {
      const desc = /*index*/ hist.order ?
        `Go to move # ${/*index*/hist.order} --> (${getPosition(hist.move)})` :
        'Go to game start';
      return (
        <li key={index}>
          <button onClick={() => jumpTo(index)}>{
            index === state.stepNumber ?
              (<><b>{desc}</b></>) :
              (<>{desc}</>)
          }</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={
              winner
                ? winner.squares || []
                : []
            }
            onClick={(index) => handleClick(index)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <Toggle onClickOrder={ (asc) => orderListAsc(asc) }/>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  return (
    renderGame()
  );
}
