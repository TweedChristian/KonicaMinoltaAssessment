import { LinkedList } from "../abstract-data-types/linked-list.adt";
import { Line } from "../interfaces/line.interface";

export type LineList = LinkedList<Line>;

export type Players = "Player1" | "Player2";

export interface GameState {
  isOver: boolean;
  lines: LineList;
  currentPlayer: Players;
  width: number;
  height: number;
}

export const GameStateFactory = (): GameState => ({
  isOver: false,
  lines: new LinkedList<Line>(),
  currentPlayer: "Player1",
  width: 4,
  height: 4,
});
