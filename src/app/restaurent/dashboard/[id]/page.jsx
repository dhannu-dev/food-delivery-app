"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditFoodItem() {
  const [name, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      handleFetchFoodById(id);
    }
  }, [id]);

  const handleFetchFoodById = async (id) => {
    console.log("fetch Id", id);
    const result = await fetch(
      `http://localhost:3000/api/restaurent/foods/edit/${id}`
    );

    const data = await result.json();
    setFoodName(data.result.name);
    setPrice(data.result.price);
    setPath(data.result.path);
    setDescription(data.result.description);
  };

  const handleEditFoodItem = async (id) => {
    if (!name || !path || !price || !description) {
      setError(true);
      return;
    }

    const result = await fetch(
      `http://localhost:3000/api/restaurent/foods/edit/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ name, price, path, description }),
      }
    );

    const data = await result.json();
    if (data.success) {
      alert("Food Data has been updated");
      router.push("/restaurent/dashboard");
    }
  };

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

        <button
          onClick={() => handleEditFoodItem(id)}
          className="w-full p-2 rounded-md border mt-5 bg-zinc-300 text-black hover:bg-black hover:text-white cursor-pointer"
        >
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
