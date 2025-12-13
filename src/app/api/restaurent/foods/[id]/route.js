import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Foods from "@/lib/foodModel";

export const GET = async (request, content) => {
  const {id} = await content.params
  await connectDB();
  const result = await Foods.find({ resto_id : id });
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
