import mongoose from "mongoose";

const RestaurentSchema = new mongoose.Schema({
  name: String,
});

// Prevent OverwriteModelError
export default mongoose.models.Restaurent ||
  mongoose.model("Restaurent", RestaurentSchema);
