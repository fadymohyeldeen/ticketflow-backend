import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/adminRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { initializeAdmin } from "./services/initializeAdmin.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://ticketflow-ap2vitubu-fadymohyel-deens-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

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
