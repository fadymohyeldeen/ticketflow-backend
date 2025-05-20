import { adminModel } from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJWT = (data) => {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "24h" });
};

export const login = async ({ email, password }) => {
  const admin = await adminModel.findOne({ email });

  if (!admin) {
    return { data: "Email or password are incorrect!", statusCode: 401 };
  }
  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    return { data: "Email or password are incorrect!", statusCode: 401 };
  }
  return {
    data: generateJWT({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email,
    }),
    statusCode: 200,
  };
};
