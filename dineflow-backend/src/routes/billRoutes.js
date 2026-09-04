import express from "express";

import {
  createBillController,
  getBillsController,
  getBillByIdController,
  getBillByOrderController,
} from "../controllers/billController.js";

const router = express.Router();

// Create Bill
router.post("/", createBillController);

// Get All Bills
router.get("/", getBillsController);

// Get Bill By Order
router.get("/order/:orderId", getBillByOrderController);

// Get Bill By ID
router.get("/:id", getBillByIdController);

export default router;