import { connectDB } from "@/lib/connectDB";
import { Order } from "@/lib/orderModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const payload = await request.json();
  await connectDB();
  const orderObj = new Order(payload);
  const result = await orderObj.save();
  return NextResponse.json({ result, success: true });
};
