import { useState, useEffect } from "react";
import "./Board.css";

type Player = "x" | "o" | "-";

const Board: React.FC = () => {
  const [board, setBoard] = useState("---------");
  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");

  useEffect(() => {
    console.log(board);
  }, [board]);

  const handleClick = (index: number) => {
    if (board[index] !== "-") return;
    const newBoard = board.slice(0, index) + currentPlayer + board.slice(index + 1);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
  };

  return (
    <div className="board">
      {board.split("").map((cell, index) => (
        <div key={index} className="cell" onClick={() => handleClick(index)}>
          {cell !== "-" ? cell : ""}
        </div>
      ))}
    </div>
  );
};

export default Board;
