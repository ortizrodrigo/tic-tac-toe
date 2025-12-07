export type Player = "x" | "o" | "-";

export type MoveData = {
  autoguiMove: string;
  autoguiPosition: string;
  deltaRemoteness: number;
  move: string;
  moveValue: string;
  position: string;
  positionValue: string;
  remoteness: number;
};

export type PositionData = {
  autoguiPosition: string;
  moves: MoveData[];
  position: string;
  positionValue: string;
  remoteness: number;
};

export type WinningLine = [number, number, number] | null;