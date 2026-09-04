import express from "express";

import {
  getSalesReportController,
  getPaymentReportController,
} from "../controllers/reportController.js";

const router = express.Router();

// Sales Report
router.get("/sales", getSalesReportController);

// Payment Report
router.get("/payments", getPaymentReportController);

export default router;