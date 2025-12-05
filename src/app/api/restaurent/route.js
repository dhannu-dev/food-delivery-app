import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/connectDB";
import Restaurent from "@/lib/restaurentModel";

export async function GET() {
  await connectDB();
  const data = await Restaurent.create({ name: "Test Restaurent " });
  console.log(data);
  return NextResponse.json({ message: "API Working" });
}
