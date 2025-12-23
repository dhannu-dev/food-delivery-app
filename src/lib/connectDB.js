import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "delivery_app",
    });
    console.log("connect db");
  } catch (error) {
    console.log(error);
  }
}
