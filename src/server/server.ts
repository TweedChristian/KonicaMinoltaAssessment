import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import initializeRouter from "./routes/initialize";
import errorRouter from "./routes/error";
import nodeClickedRouter from "./routes/node-clicked";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? '8080';

app.use(cors());
app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use("/initialize", initializeRouter);
app.use("/error", errorRouter);
app.use("/node-clicked", nodeClickedRouter);

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port} ⚡️`);
});
