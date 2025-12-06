import { useState } from "react";
import "./Board.css";

type Player = "X" | "O" | "";

const Board: React.FC = () => {
  const [cells, setCells] = useState<Player[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const handleClick = (index: number) => {
    if (cells[index] !== "") return;
    const newCells = [...cells];
    newCells[index] = currentPlayer;
    setCells(newCells);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <div className="board">
      {cells.map((cell, index) => (
        <div key={index} className="cell" onClick={() => handleClick(index)}>
          {cell}
        </div>
      ))}
    </div>
  );
};

export default Board;
