import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const hashPassword = (password: string) => bcrypt.hash(password, 5);

export const createJWT = ({ id, username }: User) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET);
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    return res.json({ message: "Not authorized" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    return res.json({ message: "Not authorized" });
  }

  try {
    const user = <jwt.UserIdJWTPayload>(
      jwt.verify(token, process.env.JWT_SECRET)
    );
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    return res.json({ message: "Not authorized" });
  }
};
