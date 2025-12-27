import express from "express";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrder,
  verifyOrder,
} from "../controllers/order.controller.js";
import authMiddleware from "./../middleware/auth.js";
import { validateOrder } from "../middleware/validation.js";
import { orderLimiter } from "../middleware/rateLimiter.js";

const orderRoute = express.Router();

orderRoute.post(
  "/place",
  authMiddleware,
  orderLimiter,
  validateOrder,
  placeOrder
);

orderRoute.post("/verify", verifyOrder);

orderRoute.post("/myorder", authMiddleware, userOrder);

orderRoute.get("/list", listOrders);

orderRoute.post("/status", updateStatus);

export default orderRoute;
