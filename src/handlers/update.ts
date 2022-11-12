import { Request, Response } from "express";
import prisma from "../db";

export const getUpdates = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      products: {
        include: { updates: true },
      },
    },
  });

  res.json({ data: user?.products });
};
