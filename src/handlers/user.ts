import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import HttpException from "../exceptions/HttpException";
import AugError from "../exceptions/TypeError";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      const augError = new AugError(e.message, 400);
      augError.type = "input";
      next(augError);
    } else {
      next(e);
    }
  }
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (!user || !(await comparePasswords(req.body.password, user.password))) {
    return res.status(401).json({ message: "wrong credentials" });
  }

  const token = createJWT(user);
  res.json({ token });
};
