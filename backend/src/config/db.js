import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Connect DB successfully");
  } catch (error) {
    console.error("Connect DB failed", error);
  }
};
