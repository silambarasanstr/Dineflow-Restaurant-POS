import express from "express";

import {
  createMenuItemController,
  getMenuItemsController,
  getMenuItemByIdController,
  updateMenuItemController,
  deleteMenuItemController,
} from "../controllers/menuItemController.js";

const router = express.Router();

// Create Menu Item
router.post("/", createMenuItemController);

// Get All Menu Items
router.get("/", getMenuItemsController);

// Get Menu Item By ID
router.get("/:id", getMenuItemByIdController);

// Update Menu Item
router.put("/:id", updateMenuItemController);

// Delete Menu Item
router.delete("/:id", deleteMenuItemController);

export default router;