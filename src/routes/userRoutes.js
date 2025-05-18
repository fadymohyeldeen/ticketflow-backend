import express from "express";
import { login } from "../services/userServices.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, statusCode } = await login({ email, password });
  res.status(statusCode).send(data);
});

export default router;