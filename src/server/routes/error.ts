import express, { Request, Response } from "express";

const errorRouter = express.Router();

errorRouter.post("/", (req: Request, res: Response) => {
  console.log(`ERROR: ${req.body}`);
  res.sendStatus(200);
});

export default errorRouter;