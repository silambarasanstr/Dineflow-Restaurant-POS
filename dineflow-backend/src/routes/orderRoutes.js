import express from "express";

import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
} from "../controllers/orderController.js";

const router = express.Router();

// Create Order
router.post("/", createOrderController);

// Get All Orders
router.get("/", getOrdersController);

// Get Order By ID
router.get("/:id", getOrderByIdController);

// Update Order Status
router.patch("/:id/status", updateOrderStatusController);

export default router;