import mongoose from "mongoose";

const RestaurentSchema = new mongoose.Schema({
  name: String,
  email: String,
  city : String,
  password: String,
});

// Prevent OverwriteModelError
export default mongoose.models.Restaurent ||
  mongoose.model("Restaurent", RestaurentSchema);
