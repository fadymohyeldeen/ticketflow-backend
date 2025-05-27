import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables first
dotenv.config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://ticketflow-ap2vitubu-fadymohyel-deens-projects.vercel.app",
      "https://ticketflow-backend-production.up.railway.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Essential middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Critical health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
  });
});

// Server startup with proper error handling
const startServer = async () => {
  try {
    // MongoDB connection with timeout
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://0.0.0.0:${PORT}/health`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("SIGTERM received");
      server.close(() => {
        mongoose.connection.close(false);
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("Fatal startup error:", err);
    process.exit(1);
  }
};

startServer();
