"use client";
import AddFoodItem from "@/components/AddFoodItem";
import RestaurentHeader from "@/components/RestaurentHeader";
import React, { useState } from "react";

export default function page() {
  const [addItem, setAddItem] = useState(false);
  return (
    <div className="h-screen">
      <RestaurentHeader />
      <div className="mt-5 flex gap-5 justify-center items-center">
        <button
          className="p-2 rounded-md bg-zinc-200 cursor-pointer text-black hover:bg-black hover:text-white hover:border-white hover:border"
          onClick={() => setAddItem(true)}
        >
          Add Food
        </button>
        <button
          className="p-2 rounded-md bg-zinc-200 cursor-pointer text-black hover:bg-black hover:text-white hover:border-white hover:border"
          onClick={() => setAddItem(false)}
        >
          Dashboard
        </button>
      </div>

      {addItem ? (
        <AddFoodItem />
      ) : (
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-2xl ">Welcome to Dashboard</h1>
        </div>
      )}
    </div>
  );
}
