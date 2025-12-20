import { connectDB } from "@/lib/connectDB";
import { Order } from "@/lib/orderModel";
import { NextResponse } from "next/server";
import Restaurent from "@/lib/restaurentModel";

export const POST = async (request) => {
  const payload = await request.json();
  await connectDB();
  const orderObj = new Order(payload);
  const result = await orderObj.save();
  return NextResponse.json({ result, success: true });
};

export const GET = async (request) => {
  const userId = request.nextUrl.searchParams.get("id");
  await connectDB();
  let result = await Order.find({ user_id: userId });
  console.log("result", result)
  if (result) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await Restaurent.findOne({ _id: item.resto_id });
        restoInfo.amount = item.amount;
        restoInfo.status = item.status
        return restoInfo;
      })
    );
    result = restoData;
  }

  return NextResponse.json({ result, success: true });
};
