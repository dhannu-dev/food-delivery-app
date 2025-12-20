import mongoose from "mongoose";

const delieveryPartnerSchema = new mongoose.Schema({
  name: String,
  password: String,
  mobile : String,
  city: String,
});

export const DeliveryMan =
  mongoose.models.delieveryMan ||
  mongoose.model("delieveryMan", delieveryPartnerSchema);
