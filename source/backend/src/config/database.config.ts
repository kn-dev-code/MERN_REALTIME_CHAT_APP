import { Env } from "./env.config";
import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
await mongoose.connect(Env.MONGO_URI);
console.log("Database connected")
  } catch(e) {
console.error("Database connection error:", e);
process.exit(1);
  }
};

export default connectDatabase;