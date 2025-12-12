import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Foods from "@/lib/foodModel";

export const GET = async (request, content) => {
  const id = content.params.id;
  await connectDB();
  const result = await Foods.find({ resto_id: "6937bb59e792042e9b2a750f" });
  return NextResponse.json({ result, success: true });
};
