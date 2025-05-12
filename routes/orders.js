import { Router } from "express";
import ordersController from "../controllers/ordersController.js";

const router = Router();

export default () => {
  router.get("/", ordersController.getAllOrders);
  router.get("/:id", ordersController.getOrderById);
  router.post("/", ordersController.createOrder);
  router.post('/:id/refund', ordersController.refundOrder);

  return router;
}
