import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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
};
