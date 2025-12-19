import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  foodItemsIds: String,
  resto_id: mongoose.Schema.Types.ObjectId,
  delieveryBoy_id: mongoose.Schema.Types.ObjectId,
  status: String,
  amount: String,
});

export const Order =
  mongoose.models.orders || mongoose.model("orders", orderSchema);
