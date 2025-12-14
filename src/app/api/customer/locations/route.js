import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Restaurent from "@/lib/restaurentModel";

export const GET = async () => {
  await connectDB();
  let result = await Restaurent.find();
  result = result.map((item) => item.city.charAt(0).toUpperCase() + item.city.slice(1));
  result = [...new Set(result.map((item) => item))]
  return NextResponse.json({ result, success: true });
};
