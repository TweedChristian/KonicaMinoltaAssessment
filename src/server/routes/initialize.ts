import express, { Request, Response } from "express";

import { GameController } from "../controllers/game.controller";
import { Payload } from "../interfaces/payload.interface";

const initializeRouter = express.Router();

interface InitializeResponse extends Payload {
  msg: "INITIALIZE",
  body: {
    newLine: null;
    heading: string;
    message: string;
  };
}

const createInitializeResponse = (heading: string, message: string): InitializeResponse => ({
  msg: "INITIALIZE",
  body: {
    newLine: null,
    heading,
    message
  },
})

initializeRouter.use("/", (_req, _res, next) => {
  GameController.initialize();
  next();
});

initializeRouter.get("/", (_req: Request, res: Response) => {
  const heading = GameController.currentPlayer;
  const message = `Awaiting ${GameController.currentPlayer}`;
  const response = createInitializeResponse(heading, message);
  res.status(200).json(response);
})

export default initializeRouter;