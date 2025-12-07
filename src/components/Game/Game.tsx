import { useState, useEffect } from "react";
import Hint from "../Hint/Hint";
import X from "../X/X";
import O from "../O/O";
import variants from "../../data/variants";
import SplitView from "../SplitView/SplitView";

import type { Player, PositionData } from "../../types";

import "./Game.css";

export default function Game() {
  const [board, setBoard] = useState("---------");
  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");
  const [positionData, setPositionData] = useState<PositionData | null>(null);
  const [positionHints, setPositionHints] = useState<string[]>(Array(9).fill(""));
  const [showHints, setShowHints] = useState<boolean>(true);

  const urlPrefix = "https://nyc.cs.berkeley.edu/universal/v1/tictactoe/regular/positions/?p=";

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
    if (board[index] !== "-") return;
    const newBoard = board.slice(0, index) + currentPlayer + board.slice(index + 1);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
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
        <div className="board">
          {board.split("").map((cell, index) => (
            <div key={index} className="cell" onClick={() => handleClick(index)}>
              {cell === "x" && <X />}
              {cell === "o" && <O />}
              {cell === "-" && <Hint color={getHintColor(positionHints[index])} />}
            </div>
          ))}
        </div>
        <div className="stats">
          <input
            type="button"
            value={"Show Hints"}
            onClick={() => {
              setShowHints(!showHints);
            }}
            className="hints-button"
          />
        </div>
      </SplitView>
    </div>
  );
}
