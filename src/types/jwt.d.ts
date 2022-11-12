import * as jwt from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface UserIdJWTPayload extends jwt.JwtPayload {
    id: string;
    username: string;
  }
}
