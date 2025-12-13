import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FoodItemList() {
  const [foodItems, setFoodItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const restaurentData = JSON.parse(localStorage.getItem("restaurentUser"));
    const resto_id = restaurentData._id;
    let response = await fetch(
      `http://localhost:3000/api/restaurent/foods/${resto_id}`
    );
    response = await response.json();
    if (response.success) {
      setFoodItems(response.result);
    } else {
      alert("food items list is not loading");
    }
  };

  const handleDelete = async (foodID) => {
    let response = await fetch(
      `http://localhost:3000/api/restaurent/foods/${foodID}`,
      {
        method: "delete",
      }
    );

    response = await response.json();
    if (response.success) {
      loadFoodItems();
    } else {
      alert("food item are not deleted");
    }
  };

  const handleEdit = (id) => {
    router.push(`/restaurent/dashboard/${id}`);
  };

  return (
    <div className="flex flex-col w-full items-center  px-4 text-white">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Food Items</h1>

      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full border border-zinc-800 rounded-xl overflow-hidden">
          {/* Table Head */}
          <thead className="bg-zinc-900/80 text-zinc-300">
            <tr>
              <th className="p-3 border-b border-zinc-800 text-left">S.NO</th>
              <th className="p-3 border-b border-zinc-800 text-left">Name</th>
              <th className="p-3 border-b border-zinc-800 text-left">Price</th>
              <th className="p-3 border-b border-zinc-800 text-left">
                Description
              </th>
              <th className="p-3 border-b border-zinc-800 text-left">Image</th>
              <th className="p-3 border-b border-zinc-800 text-left">
                Operation
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {foodItems.map((food, idx) => {
              return (
                <tr key={food._id} className="hover:bg-zinc-900 transition">
                  <td className="p-3 border-b border-zinc-800">{idx + 1}</td>
                  <td className="p-3 border-b border-zinc-800">{food.name}</td>
                  <td className="p-3 border-b border-zinc-800">
                    ₹{food.price}
                  </td>
                  <td className="p-3 border-b border-zinc-800">
                    {food.description}
                  </td>

                  <td className="p-3 border-b border-zinc-800">
                    <div className="w-16 h-16 border border-zinc-700 rounded-md overflow-hidden">
                      <img
                        src={food.path}
                        alt="food"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  <td className="p-3 border-b border-zinc-800 space-x-2">
                    <button
                      onClick={() => handleEdit(food._id)}
                      className="px-3 py-1 bg-blue-600 rounded-md text-sm hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
