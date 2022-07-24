import { Point } from "./point.interface";
import { StateUpdate } from "./state-update.interface";

export interface Payload {
  msg: string;
  body: StateUpdate | Point | string;
}
