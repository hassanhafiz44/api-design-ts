import { UserIdJWTPayload } from "jsonwebtoken";

export {};

declare global {
  namespace Express {
    interface Request {
      shhhh_secret: string;
      user: UserIdJWTPayload;
    }
  }
}
