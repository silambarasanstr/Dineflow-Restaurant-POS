import express from "express";

import {
  createCustomerController,
  getCustomersController,
  getCustomerByIdController,
  getCustomerByPhoneController,
  updateCustomerController,
  deleteCustomerController,
  updateCustomerStatusController,
} from "../controllers/customerController.js";

const router = express.Router();

// Create Customer
router.post("/", createCustomerController);

// Get All Customers
router.get("/", getCustomersController);

// Get Customer By Phone
router.get("/phone/:phone", getCustomerByPhoneController);

// Get Customer By ID
router.get("/:id", getCustomerByIdController);

// Update Customer
router.put("/:id", updateCustomerController);

// Delete Customer
router.delete("/:id", deleteCustomerController);

// Update Customer Status
router.patch("/:id/status", updateCustomerStatusController);

export default router;