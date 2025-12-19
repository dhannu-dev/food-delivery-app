import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  phone: String,
  city: String,
});

export const User =
  mongoose.models.users || mongoose.model("users", UserSchema);
