import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/userModel";
import { NextResponse } from "next/server";

export const POST = async(request) => {
  try {
    const payload = await request.json();
    await connectDB();
    const user = new User(payload);
    const result = await user.save();
    
    return NextResponse.json({result, success : true})
  } catch (error) {
      return NextResponse.json({success : false, message : error.message})
  }
}