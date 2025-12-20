
import { connectDB } from "@/lib/connectDB";
import { DeliveryMan } from "@/lib/delieveryPartnerModel";
import { NextResponse } from "next/server";


export const POST = async(request) => {
    const payload = await request.json();
    await connectDB();
    console.log("payload", payload)
    const deliveryMan = new DeliveryMan(payload);
    const result = await deliveryMan.save();
    return NextResponse.json({result, success : true})
}