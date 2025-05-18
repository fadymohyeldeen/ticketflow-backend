import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { initializeAdmin } from "./services/initializeAdmin.js";
import cors from "cors";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfuly.");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB." + err);
  });

app.use("/user", userRoutes);
app.use("/ticket", ticketRoutes);

initializeAdmin();

app.listen(port, () => {
  console.log(`Server runnnig on port ${port}.`);
});
