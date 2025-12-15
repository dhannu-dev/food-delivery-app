import { connectDB } from "@/lib/connectDB";
import Restaurent from "@/lib/restaurentModel";
import Foods from "@/lib/foodModel";

import { NextResponse } from "next/server";

export const GET = async (request, context) => {
  const { id } = await context.params;
  await connectDB();
  const result = await Restaurent.find({ _id: id });
  const foodItem = await Foods.find({ resto_id: id });
  return NextResponse.json({ result, success: true, foodItem });
};
