import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Foods from "@/lib/foodModel";

export const GET = async (request, content) => {
  await connectDB();
  const result = await Foods.find({ resto_id: "6937bb59e792042e9b2a750f" });
  return NextResponse.json({ result, success: true });
};

export const DELETE = async (request, context) => {
  const { id } = await context.params;
  let success = false;
  await connectDB();
  const result = await Foods.deleteOne({ _id: id });
  if (result.deletedCount > 0) {
    success = true;
  }
  return NextResponse.json({ result, success });
};
