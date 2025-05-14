import bcrypt from "bcryptjs";
import { adminModel } from "../models/adminModel.js";

const hashedPass = await bcrypt.hash("Admin", 10);
const newAdmin = {
  firstName: "Admin",
  lastName: "Admin",
  email: "admin@example.com",
  password: hashedPass,
};
export const initializeAdmin = async () => {
  const adminCount = await adminModel.countDocuments();
  if (adminCount === 0) {
    await adminModel.insertOne(newAdmin);
  }
};

// remove role
