import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_URL
        : process.env.API_URL,
    credentials: true,
  })
);

// Health check endpoint (MUST HAVE)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Basic route
app.get("/", (req, res) => {
  res.send("TicketFlow Backend is running");
});

// Server startup
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle shutdown gracefully
    process.on("SIGTERM", () => {
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("Server failed to start", err);
    process.exit(1);
  }
};

startServer();
