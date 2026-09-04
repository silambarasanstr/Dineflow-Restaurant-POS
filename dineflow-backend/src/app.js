import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

// Middleware

app.use(
  cors({
    origin: "http://localhost:9001",
  })
);

app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/menu-items", menuItemRoutes);

app.use("/api/tables", tableRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/bills", billRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/reports", reportRoutes);

// Test route

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DineFlow API is running",
  });
});

export default app;