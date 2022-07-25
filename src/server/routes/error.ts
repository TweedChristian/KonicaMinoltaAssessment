import express, { Request, Response } from "express";

const errorRouter = express.Router();

errorRouter.post("/", (_req: Request, res: Response) => {
  res.sendStatus(200);
});

export default errorRouter;