import { Router } from "express";
import productsController from "../controllers/productsController.js";

const router = Router();

export default () => {
  router.get("/", productsController.getAllProducts);
  router.get("/:id", productsController.getProductById);

  return router;
}
