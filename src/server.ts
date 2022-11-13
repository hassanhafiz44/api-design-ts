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

app.get("/", (_req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => {
    next(new Error("Hello"));
  }, 1);
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.json({ message: "There was an error" });
  }
);

export default app;
