import React, { useState } from "react";

export default function AddFoodItem() {
  const [name, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleAddFood = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    }

    let resto_id;
    const restaurentData = JSON.parse(localStorage.getItem("restaurentUser"));
    if (restaurentData) {
      resto_id = restaurentData._id;
    }

    let response = await fetch("http://localhost:3000/api/restaurent/foods", {
      method: "POST",
      body: JSON.stringify({ name, price, path, description, resto_id }),
    });

    response = await response.json();

    if (response.success) {
      alert("food item added");
    } else {
      alert("food item not added");
    }

    setFoodName("");
    setDescription("");
    setPrice("");
    setPath("");
    setError("");
  };

  return (
    <div className="w-full justify-center items-center flex flex-col">
      <h1 className="text-2xl mt-8">Add Food Item</h1>
      <div className="flex flex-col">
        <div className="mt-5 ">
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
          onClick={handleAddFood}
          className="w-full p-2 rounded-md border mt-5 bg-zinc-300 text-black hover:bg-black hover:text-white cursor-pointer"
        >
          Add Food Item
        </button>
      </div>
    </div>
  );
}
