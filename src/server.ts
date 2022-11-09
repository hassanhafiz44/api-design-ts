import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import router from "./router";

const app = express();

const customLogger =
  (message: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`Hello from ${message}`);
    next();
  };

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger("Hello"));

app.get("/", (_req: Request, res: Response) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", router);

export default app;
