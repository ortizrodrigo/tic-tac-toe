import "./Game.css";
import { useState, useEffect } from "react";
import Hint from "../Hint/Hint";
import X from "../X/X";
import O from "../O/O";
import variants from "../../data/variants";
import SplitView from "../SplitView/SplitView";

import type { Player, PositionData, WinningLine } from "../../types";

export default function Game() {
  const [board, setBoard] = useState("---------");
  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");
  const [positionData, setPositionData] = useState<PositionData | null>(null);
  const [positionHints, setPositionHints] = useState<string[]>(Array(9).fill(""));
  const [showHints, setShowHints] = useState(true);
  const [hintsBtnText, setHintsBtnText] = useState("Hide Hints");
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  const [gameOver, setGameOver] = useState(false);

  const urlPrefix = "https://nyc.cs.berkeley.edu/universal/v1/tictactoe/regular/positions/?p=";

  const winningCombinations: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (boardState: string): WinningLine => {
    for (const [a, b, c] of winningCombinations) {
      if (
        boardState[a] !== "-" &&
        boardState[a] === boardState[b] &&
        boardState[b] === boardState[c]
      ) {
        return [a, b, c];
      }
    }
    return null;
  };

  useEffect(() => {
    const line = checkWin(board);
    if (line) {
      setWinningLine(line);
      setGameOver(true);
    }
  }, [board]);

  useEffect(() => {
    if (!showHints) {
      setPositionData(null);
      setPositionHints(Array(9).fill(""));
      return;
    }

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
  }, [board, showHints]);

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
    if (board[index] !== "-" || gameOver) return;
    const newBoard = board.slice(0, index) + currentPlayer + board.slice(index + 1);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
  };

  const resetGame = () => {
    setBoard("---------");
    setCurrentPlayer("x");
    setWinningLine(null);
    setGameOver(false);
    setPositionHints(Array(9).fill(""));
  };

  const getHintColor = (hint: string) => {
    if (!showHints) return "gray";

    const colorMap: Record<string, string> = {
      win: "#c1e2be",
      lose: "#faa0a0",
      tie: "#fef8c6",
    };
    return colorMap[hint] ?? "gray";
  };

  const getCellCenter = (index: number): { x: number; y: number } => {
    const cellSize = 200;
    const row = Math.floor(index / 3);
    const col = index % 3;
    return {
      x: col * cellSize + cellSize / 2,
      y: row * cellSize + cellSize / 2,
    };
  };

  const getLineCoordinates = (
    startIdx: number,
    endIdx: number
  ): { x1: number; y1: number; x2: number; y2: number } => {
    const startCenter = getCellCenter(startIdx);
    const endCenter = getCellCenter(endIdx);

    const dx = endCenter.x - startCenter.x;
    const dy = endCenter.y - startCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const dirX = dx / distance;
    const dirY = dy / distance;

    return {
      x1: startCenter.x - dirX * 300,
      y1: startCenter.y - dirY * 300,
      x2: endCenter.x + dirX * 300,
      y2: endCenter.y + dirY * 300,
    };
  };

  return (
    <div className="game">
      <SplitView template="1fr 2fr 1fr">
        <div className="variants">
          <ul>
            {variants.map((variant) => (
              <li>{variant}</li>
            ))}
          </ul>
        </div>
        <div className="board-container">
          <div className="board">
            {board.split("").map((cell, index) => (
              <div key={index} className="cell" onClick={() => handleClick(index)}>
                {cell === "x" && <X />}
                {cell === "o" && <O />}
                {cell === "-" && <Hint color={getHintColor(positionHints[index])} />}
              </div>
            ))}
          </div>
          {winningLine &&
            (() => {
              const coords = getLineCoordinates(winningLine[0], winningLine[2]);
              return (
                <svg className="winning-line" viewBox="0 0 600 600">
                  <line
                    x1={coords.x1}
                    y1={coords.y1}
                    x2={coords.x2}
                    y2={coords.y2}
                    stroke="var(--bougee-wood)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              );
            })()}
        </div>
        <div className="stats">
          <input
            type="button"
            value={hintsBtnText}
            onClick={() => {
              setShowHints(!showHints);
              setHintsBtnText(hintsBtnText === "Show Hints" ? "Hide Hints" : "Show Hints");
            }}
            className="hints-button"
          />
          <input type="button" value="Reset" onClick={resetGame} className="hints-button" />
        </div>
      </SplitView>
    </div>
  );
}
