import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middlewares";

const router = Router();

/**
 * Product routes
 */
router.get("/product", (_req: Request, res: Response) => {
  res.json({ message: "hello" });
});
router.get("/product/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `product with ${id}` });
});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ message: `product with ${id}` });
  }
);
router.delete("/product/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `product with ${id}` });
});
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    const { body } = req;
    res.json({ data: body });
  }
);

/**
 * Update routes
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  () => {}
);
router.delete("/update/:id", () => {});
router.post(
  "/update",
  body("title").isString().notEmpty().exists(),
  body("body").exists().isString().notEmpty(),
  () => {}
);

/**
 * Update point routes
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("updateId").exists().isString(),
  () => {}
);

export default router;
