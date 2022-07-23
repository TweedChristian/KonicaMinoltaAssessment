import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (_req: Request, res: Response) => {
  res.send('Getting started');
});

app.get("/initialize", (req: Request, res: Response) => {
  console.log(req);
  res.send("Tada");
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port} ⚡️`);
});
