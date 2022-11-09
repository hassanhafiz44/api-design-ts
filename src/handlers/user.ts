import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });
  const token = createJWT(user);
  res.json({ token });
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
