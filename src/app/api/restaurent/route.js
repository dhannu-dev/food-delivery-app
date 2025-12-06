import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/connectDB";
import Restaurent from "@/lib/restaurentModel";

export async function GET() {
  await connectDB();
  const data = await Restaurent.find();
  console.log(data);
  return NextResponse.json({ message: "API Working" });
}

export async function POST() {
  return NextResponse.json({ result: trues });
}
