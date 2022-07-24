import express, { Request, Response } from "express";

const errorRouter = express.Router();

errorRouter.use("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
});

export default errorRouter;