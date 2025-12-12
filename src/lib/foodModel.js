import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: String,
  price: String,
  path: String,
  description: String,
  resto_id: mongoose.Schema.Types.ObjectId,
});


export default mongoose.models.foods || mongoose.model("foods", FoodSchema);
