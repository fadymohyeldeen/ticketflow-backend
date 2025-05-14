import { adminModel } from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJWT = (data) => {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "24h" });
};

export const login = async ({ email, password }) => {
  const user = await adminModel.findOne({ email });
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!user || !passwordMatch) {
    return { data: "Email or password are incorrect!", statusCode: 401 };
  }
  return {
    data: generateJWT({
      firstName: user.firstName,
      lastName: user.lastName,
      email,
    }),
    statusCode: 200,
  };
};
