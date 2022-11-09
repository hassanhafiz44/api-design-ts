import express, { Request, Response } from "express";
import router from "./router";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", router);

export default app;
