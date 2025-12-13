"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EditFoodItem() {
  const [name, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleBackButton = () => {
    router.push("/restaurent/dashboard");
  };

  return (
    <div className="w-full justify-center h-screen items-center flex flex-col">
      <h1 className="text-2xl font-semibold ">Edit Food Item</h1>
      <div className="flex flex-col">
        <div className="mt-2 ">
          <input
            type="text"
            value={name}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter Food Name"
            className="p-2 rounded-md border border-zinc-300 mt-2 w-[300px] "
          />
          {error && !name && (
            <p className="text-center mt-1 text-red-600">
              Please enter a Food Name
            </p>
          )}
        </div>

        <div className="mt-2">
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            className="p-2 rounded-md border border-zinc-300 mt-2 w-[300px] "
          />
          {error && !price && (
            <p className="text-center mt-1 text-red-600">
              Please enter a Price
            </p>
          )}
        </div>

        <div className="mt-2">
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="Enter Image Path"
            className="p-2 rounded-md border border-zinc-300 mt-2 w-[300px] "
          />
          {error && !path && (
            <p className="text-center mt-1 text-red-600">
              Please enter a Food Path
            </p>
          )}
        </div>

        <div className="mt-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="p-2 rounded-md border border-zinc-300 mt-2 w-[300px] "
          />
          {error && !description && (
            <p className="text-center mt-1 text-red-600">
              Please enter a Food Description
            </p>
          )}
        </div>

        <button className="w-full p-2 rounded-md border mt-5 bg-zinc-300 text-black hover:bg-black hover:text-white cursor-pointer">
          Update Food Item
        </button>

        <button
          onClick={handleBackButton}
          className="w-full p-2 rounded-md border mt-5 bg-zinc-300 text-black hover:bg-black hover:text-white cursor-pointer"
        >
          Back To Food Item List
        </button>
      </div>
    </div>
  );
}
