import { connectDB } from "@/lib/connectDB";
import { Order } from "@/lib/orderModel";
import { NextResponse } from "next/server";
import Restaurent from "@/lib/restaurentModel";

export const GET = async (request, content) => {
  const { id } = await content.params;
  console.log(id)
  await connectDB();
  let result = await Order.find({
    delieveryBoy_id: id,
  });
  console.log("result", result);
  if (result) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await Restaurent.findOne({ _id: item.resto_id });
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        return restoInfo;
      })
    );
    result = restoData;
  }

  return NextResponse.json({ result, success: true });
};
