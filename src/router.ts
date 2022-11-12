import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { getUpdates } from "./handlers/update";
import { handleInputErrors } from "./modules/middlewares";

const router = Router();

/**
 * Product routes
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.delete("/product/:id", deleteProduct);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

/**
 * Update routes
 */
router.get("/update", getUpdates);
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
