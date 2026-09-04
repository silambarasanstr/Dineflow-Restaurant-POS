import express from "express";

import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategoryController);

router.get("/", getCategoriesController);

router.get("/:id", getCategoryByIdController);

router.put("/:id", updateCategoryController);

router.delete("/:id", deleteCategoryController);

export default router;