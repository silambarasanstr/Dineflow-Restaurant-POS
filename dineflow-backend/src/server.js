import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 9000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`
====================================
🚀 DineFlow Backend Started
====================================
🌐 Server      : http://localhost:${PORT}
📦 Environment : ${process.env.NODE_ENV}
🍃 MongoDB Connected : ${process.env.MONGO_URI}
====================================
`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
