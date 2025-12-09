import RestaurentHeader from "@/components/RestaurentHeader";
import React from "react";

export default function page() {
  return (
    <div className="h-screen">
      <div className="">
        <RestaurentHeader />
      </div>
      <div className="flex justify-center items-center mt-10">
        <h1 className="text-2xl ">Welcome to Dashboard</h1>
      </div>
    </div>
  );
}
