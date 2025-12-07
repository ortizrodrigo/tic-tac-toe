import { useState, useEffect } from "react";

import "./Board.css";

type Player = "x" | "o" | "-";

type MoveData = {
  autoguiMove: string;
  autoguiPosition: string;
  deltaRemoteness: number;
  move: string;
  moveValue: string;
  position: string;
  positionValue: string;
  remoteness: number;
};

type PositionData = {
  autoguiPosition: string;
  moves: MoveData[];
  position: string;
  positionValue: string;
  remoteness: number;
};

const Board: React.FC = () => {
  const [board, setBoard] = useState("---------");
  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");
  const [positionData, setPositionData] = useState<PositionData | null>(null);
  const [positionHints, setPositionHints] = useState<string[]>(Array(9).fill(""));

  const urlPrefix = "https://nyc.cs.berkeley.edu/universal/v1/tictactoe/regular/positions/?p=";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nextPlayer = (board.split("-").length - 1) % 2 === 0 ? 2 : 1;
        const res = await fetch(`${urlPrefix}${nextPlayer}_${board}`);
        const result = await res.json();
        setPositionData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [board]);

  useEffect(() => {
    if (!positionData) return;
    positionData.moves.map((moveObj) => {
      setPositionHints((prevHints) => {
        const newHints = [...prevHints];
        newHints[+moveObj.move - 1] = moveObj.moveValue;
        return newHints;
      });
    });
  }, [positionData]);

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
          {cell !== "-" ? cell : positionHints[index]}
        </div>
      ))}
    </div>
  );
};

export default Board;
