import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/adminRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { initializeAdmin } from "./services/initializeAdmin.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();

// Enhanced CORS configuration
const allowedOrigins = [
  "https://ticketflow-frontend.vercel.app",
  "https://ticketflow-frontend-g3bnfs6vp-fadymohyel-deens-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
  })
);

app.options("*", cors());
app.options("/user", cors()); // For user routes
app.options("/user/*", cors()); // For nested user routes
app.options("/ticket", cors()); // For ticket collection
app.options("/ticket/*", cors()); // For individual tickets

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation at Root
app.get("/", (req, res) => {
  res.json({
    status: "running",
    api: {
      v1: {
        user: "/user",
        ticket: "/ticket",
      },
    },
    documentation: "https://github.com/your-repo/docs",
  });
});

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    memoryUsage: process.memoryUsage(),
  });
});

// Routes
app.use("/user", userRoutes);
app.use("/ticket", ticketRoutes);

// Catch-all for 404s
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    availableRoutes: [
      "GET /",
      "GET /health",
      "POST /user/login",
      "GET /ticket",
      "GET /ticket/:id",
    ],
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin);
  next();
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "favicon.ico"));
});

// Database Connection and Server Startup
async function startServer() {
  try {
    // MongoDB Connection with timeout settings
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: "majority",
    });
    console.log("MongoDB connected successfully");

    // Initialize admin user if needed
    await initializeAdmin();

    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`Allowed Origins: ${allowedOrigins.join(", ")}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("SIGTERM received - shutting down gracefully");
      server.close(() => {
        mongoose.connection.close(false);
        console.log("Server closed");
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("Fatal startup error:", err);
    process.exit(1);
  }
}

startServer();
