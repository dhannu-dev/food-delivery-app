import CustomHeader from "@/components/CustomHeader";
import React from "react";

export default function page() {
  return (
    <div className="flex h-screen w-full flex-col">
      <CustomHeader />
      <div className="flex items-center relative">
        <img src="/banner.jpg" className="w-full opacity-50" />
        <div className="absolute left-9">
          <h1 className="mb-5 text-2xl font-semibold text-center">
            Food Delivery App
          </h1>
          <div>
            <input
              placeholder="Select Place"
              type="text"
              className="border-2 border-zinc-300 p-2 w-[400px] outline-none"
            />
            <input
              type="text"
              placeholder="Enter Food or Restaurent"
              className=" border-zinc-300 border-2 p-2 w-[400px] ml-3 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
