import { Update } from "@prisma/client";
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

  const updates: Update[] = [];
  res.json({
    data: user?.products.reduce(
      (allUpdates, product) => [...allUpdates, ...product.updates],
      updates
    ),
  });
};

export const getOneUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.findUnique({
    where: { id: req.params.id },
  });
  res.json({ data: update });
};
export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: { id: req.body.productId },
  });
  if (!product) {
    return res.json({ message: "nope" });
  }
  const created = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: created });
};
export const updateUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findFirst({
    where: {
      belongsToId: req.user.id,
      updates: { some: { id: req.params.id } },
    },
    include: {
      updates: {
        where: { id: req.params.id },
      },
    },
  });

  if (!product) {
    return res.json({ message: "nope" });
  }
  if (product.updates.length === 0) {
    return res.json({ message: "nope" });
  }

  const updatedUpdate = await prisma.update.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};
export const deleteUpdate = async (req: Request, res: Response) => {};
