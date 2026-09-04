import express from "express";

import {
  createPaymentController,
  getPaymentsController,
  getPaymentByIdController,
  getPaymentByOrderController,
} from "../controllers/paymentController.js";

const router = express.Router();

// Create Payment
router.post("/", createPaymentController);

// Get All Payments
router.get("/", getPaymentsController);

// Get Payment By Order
router.get("/order/:orderId", getPaymentByOrderController);

// Get Payment By ID
router.get("/:id", getPaymentByIdController);

export default router;