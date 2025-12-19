import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/userModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const payload = await request.json();
  await connectDB();
  const result = await User.findOne({
    email: payload.email,
    password: payload.password,
  });
  return NextResponse.json({ result, success: true });
};
