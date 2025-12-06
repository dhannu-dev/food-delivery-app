import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/connectDB";
import Restaurent from "@/lib/restaurentModel";

export async function GET() {
  await connectDB();
  const data = await Restaurent.find();
  console.log(data);
  return NextResponse.json({ message: "API Working", data: data });
}

export async function POST(request) {
  const payload = await request.json();
  await connectDB();
  const restaurent = new Restaurent(payload);
  const result = restaurent.save();
  return NextResponse.json({ result, success: true });
}
