import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { DeliveryMan } from "@/lib/delieveryPartnerModel";

export const GET = async (request, content) => {
  let { city } = await content.params;
  await connectDB();
  let filter = { city: { $regex: new RegExp(city, "i") } };
  let result = await DeliveryMan.find(filter);
  return NextResponse.json({ result, success: true });
};
