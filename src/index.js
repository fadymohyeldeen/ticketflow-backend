import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/adminRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { initializeAdmin } from "./services/initializeAdmin.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("API_URL:", process.env.API_URL);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Railway!");
});

app.use(
  cors({
    origin: process.env.API_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfuly.");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB." + err);
  });

app.use("/user", userRoutes);
app.use("/ticket", ticketRoutes);

initializeAdmin();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || "An unexpected error occurred",
  });
});
