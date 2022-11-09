import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    res.json({ message: `product with ${id}` });
  }
);
router.delete("/product/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `product with ${id}` });
});
router.post("/product", (req: Request, res: Response) => {
  const { body } = req;
  res.json({ data: body });
});

/**
 * Update routes
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.delete("/update/:id", () => {});
router.post("/update", () => {});

/**
 * Update point routes
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put("/updatepoint/:id", () => {});
router.delete("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});

export default router;
