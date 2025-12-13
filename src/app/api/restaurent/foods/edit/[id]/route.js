import { connectDB } from "@/lib/connectDB";
import Foods from "@/lib/foodModel";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
  const { id } = await context.params;
  console.log(id);
  await connectDB();
  const result = await Foods.findOne({ _id: id });
  return NextResponse.json({ result, success: true });
};

export const PUT = async (request, context) => {
  const { id } = await context.params;
  const payload = await request.json();
  await connectDB();
  const result = await Foods.findOneAndUpdate({ _id: id }, payload);
  return NextResponse.json({ result, success: true });
};
