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
  let result;
  let success = false;
  await connectDB();
  if (payload.login) {
    result = await Restaurent.findOne({
      email: payload.email,
      password: payload.password,
    });

    if (result) {
      success = true;
    }
  } else {
    const restaurent = new Restaurent(payload);
    result = await restaurent.save();

    if (result) {
      success = true;
    }
  }

  return NextResponse.json({ result, success });
}
