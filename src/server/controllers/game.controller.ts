import { GameState, GameStateFactory, Players } from "../data/game-state";

class GameStateController {
  private _state: GameState;

  constructor(){
    this._state = GameStateFactory();
  }

  public get currentPlayer(): Players {
    return this._state.currentPlayer;
  }

  public initialize(): void {
    this._state = GameStateFactory();
  }
}

export const GameController = new GameStateController();