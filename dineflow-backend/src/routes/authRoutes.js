import express from "express";

import {
  register,
  login,
  getProfile,
} from "../controllers/authController.js";

import {
  validateRegister,
  validateLogin,
} from "../validators/authValidator.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

router.get("/me", authMiddleware, getProfile);

export default router;