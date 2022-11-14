import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import HttpException from "./exceptions/HttpException";

const app = express();

const customLogger =
  (message: string) => (req: Request, res: Response, next: NextFunction) => {
    next();
  };

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger("Hello"));

app.get("/", (_req: Request, _res: Response, next: NextFunction) => {
  setTimeout(() => {
    next(new Error("Hello"));
  }, 1);
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops, that's on us" });
  }
};

app.use(errorHandler);

export default app;
