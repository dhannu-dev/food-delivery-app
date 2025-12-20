import { connectDB } from "@/lib/connectDB"
import { DeliveryMan } from "@/lib/delieveryPartnerModel";
import { NextResponse } from "next/server";

export const POST = async(request) => {
        const payload = await request.json()
        await connectDB();
        const result = await DeliveryMan.findOne({
            mobile : payload.mobile,
            password : payload.password
        });

        return NextResponse.json({result, success : true})
}