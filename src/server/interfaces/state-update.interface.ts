import { Line } from "./line.interface";

export interface StateUpdate {
  newLine: Line | null;
  heading: string | null;
  message: string | null;
}
