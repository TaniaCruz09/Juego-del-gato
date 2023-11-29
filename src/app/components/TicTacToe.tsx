'use client'

// components/TicTacToe.tsx

import { useState, useEffect } from 'react';
import Square from './Square';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const winningCombinations: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
    [0, 4, 8], [2, 4, 6],            // diagonales
  ];

  useEffect(() => {
    checkWinner();
  }, [board]); // Verificar el ganador cada vez que el tablero cambie

  const makeMove = (index: number): void => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (): void => {
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every(value => value !== '')) {
      setWinner('Empate');
    }
  };

  const renderStatus = (): string => {
    if (winner) {
      return winner === 'Empate' ? '¡El juego ha terminado en empate!' : `¡${winner} ha ganado!`;
    } else {
      return `Turno de ${currentPlayer}`;
    }
  };

  const startGame = (): void => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
    
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-pink-400">
      <div className="mt-4 text-5xl font-bold text-white mb-10">
        {renderStatus()} 
      </div>
      <div className="grid grid-cols-3 gap-5 bg-fuchsia-700 p-6 font-bold rounded-md shadow-lg text-white">
        {board.map((value, index) => (
          <Square key={index} value={value} onClick={() => makeMove(index)} />
        ))}
      </div>
      
        <button
          className="bg-fuchsia-800 text-white font-bold py-3 px-4 rounded mt-8"
          onClick={startGame}
        >
          Empezar nueva partida
        </button>
      
      

    </div>
  );
};

export default TicTacToe;
