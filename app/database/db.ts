import mongoose, { mongo } from "mongoose";

import { MONGO_URI } from "../utils/config";

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.log("MONGO_URI is not defined in the env file".red.underline.bold);
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("database connected".blue.underline.bold);
  } catch (error) {
    console.log(error.message.red.underline.bold);
    process.exit(1);
  }
};
