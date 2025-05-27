import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/adminRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { initializeAdmin } from "./services/initializeAdmin.js";

const app = express();
const originalUse = app.use.bind(app);

app.use = function (path, ...handlers) {
  if (typeof path === "string") {
    console.log("app.use called with path:", path);
  } else if (typeof path === "function") {
    console.log(
      "app.use called with middleware function:",
      path.name || "<anonymous>"
    );
    // Shift arguments since no path is provided, path is actually the first handler
    handlers.unshift(path);
    path = "/"; // or null to apply to all paths
  } else {
    console.log("app.use called with unknown first argument:", path);
  }
  return originalUse(path, ...handlers);
};

dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: process.env.API_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Railway!");
});

app.use("/user", userRoutes);
app.use("/ticket", ticketRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully!");
    await initializeAdmin();
  } catch (err) {
    console.log("Failed to connect to MongoDB." + err);
  }
}

startServer();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || "An unexpected error occurred",
  });
});
