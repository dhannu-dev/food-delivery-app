import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Restaurent from "@/lib/restaurentModel";

export const GET = async (request) => {
  const queryParams = request.nextUrl.searchParams;
  console.log(queryParams.get("location"));
  await connectDB();
  let filter = {};
  if (queryParams.get("location")) {
    let city = queryParams.get("location");
    filter = { city: { $regex: new RegExp(city, "i") } };
  } else if (queryParams.get("restaurent")) {
    let name = queryParams.get("restaurent");
    filter = { name: { $regex: new RegExp(name, "i") } };
  }
  const result = await Restaurent.find(filter);
  return NextResponse.json({ result, success: true });
};
