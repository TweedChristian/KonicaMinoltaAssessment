import express, { NextFunction, Request, Response } from "express";

import { Payload } from "../interfaces/payload.interface";
import { StateUpdate } from "../interfaces/state-update.interface";
import { Line } from "../interfaces/line.interface";
import { Point } from "../interfaces/point.interface";
import { GameController } from "../controllers/game.controller";

type NodeClickedResponseMessage = "VALID_START_NODE" 
  | "VALID_END_NODE" 
  | "INVALID_START_NODE" 
  | "INVALID_END_NODE" 
  | "GAME_OVER";

interface NodeClickedResponse extends Payload {
  msg: NodeClickedResponseMessage;
  body: StateUpdate;
}

const validStartNodeResponseFactory = (): NodeClickedResponse => ({
  msg: "VALID_START_NODE",
  body: {
    newLine: null,
    heading: GameController.currentPlayer,
    message: "Select a second node to complete the line."
  }
});

const invalidStartNodeResponseFactory = (): NodeClickedResponse => ({
  msg: "INVALID_START_NODE",
  body: {
    newLine: null,
    heading: GameController.currentPlayer,
    message: "Not a valid starting position.",
  }
});

const validEndNodeResponseFactory = (line: Line): NodeClickedResponse => ({
  msg: "VALID_END_NODE",
  body: {
    newLine: line,
    heading: GameController.currentPlayer,
    message: null,
  }
});

const invalidEndNodeResponseFactory = (): NodeClickedResponse => ({
  msg: "INVALID_END_NODE",
  body: {
    newLine: null,
    heading: GameController.currentPlayer,
    message: "Not a valid ending position.",
  }
});

const gameOverNodeResponseFactory = (newLine: Line | null): NodeClickedResponse => ({
  msg: "GAME_OVER",
  body: {
    newLine,
    heading: `${GameController.currentPlayer} Wins!`,
    message: "The game is over, please reset.",
  }
});

const nodeClickedRouter = express.Router();

//Game Over
nodeClickedRouter.post("/", (_req: Request, res: Response, next: NextFunction) => {
  if(!GameController.isGameOver){
    return next();
  }

  res.status(200).json(gameOverNodeResponseFactory(null));
});

//Start Node
nodeClickedRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  //Skip to ending point actions
  if(!GameController.isStartingNode) {
   return next();
  }

  const point = req.body;
  if(GameController.isStartNodeValid(point)){
    const responseBody = validStartNodeResponseFactory();
    GameController.saveStartNode(point);
    res.status(200).json(responseBody);
  } else {
    GameController.clearStartNode();
    const responseBody = invalidStartNodeResponseFactory();
    res.status(200).json(responseBody);
  }
});

//End Node
nodeClickedRouter.post("/", (req: Request, res: Response) => {
  const point: Point = req.body;
  if(GameController.isEndNodeValid(point)){
    const newLine = GameController.saveEndNode(point);
    GameController.clearStartNode();

    if(newLine === null){
      const responseBody = invalidEndNodeResponseFactory()
      res.status(500).json(responseBody);
      return;
    }

    GameController.updateGameOverStatus();

    if(!GameController.isGameOver){
      GameController.switchPlayers(); //Save was valid and game is not over
    }

    const responseBody = !GameController.isGameOver ? validEndNodeResponseFactory(newLine) :
      gameOverNodeResponseFactory(newLine);
      
    res.status(200).json(responseBody);
  }
  else {
    GameController.clearStartNode();
    const responseBody = invalidEndNodeResponseFactory();
    res.status(200).json(responseBody);
  }
});

export default nodeClickedRouter;