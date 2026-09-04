import express from "express";

import {
  createTableController,
  getTablesController,
  getTableByIdController,
  updateTableController,
  deleteTableController,
  updateTableStatusController,
} from "../controllers/tableController.js";

const router = express.Router();

// Create Table
router.post("/", createTableController);

// Get All Tables
router.get("/", getTablesController);

// Get Table By ID
router.get("/:id", getTableByIdController);

// Update Table
router.put("/:id", updateTableController);

// Delete Table
router.delete("/:id", deleteTableController);

// Update Table Status
router.patch("/:id/status", updateTableStatusController);

export default router;