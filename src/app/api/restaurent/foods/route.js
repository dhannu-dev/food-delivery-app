import { connectDB } from "@/lib/connectDB";
import Foods from "@/lib/foodModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  await connectDB();
  const food = new Foods(payload);
  const result = await food.save();
  return NextResponse.json({ result, success: true });
}
