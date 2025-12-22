"use client";
import CustomHeader from "@/components/CustomHeader";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [myOrder, setMyOrder] = useState([]);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    const getMyOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/order?id=${userStorage._id}`
        );
        const result = await response.json();
        console.log("result", result);
        if (result) {
          setMyOrder(result);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getMyOrder();
  }, []);

  return (
    <div className="flex flex-col gap-5 px-5">
      <CustomHeader />
      {myOrder?.result?.map((item, idx) => {
        return (
          <div key={idx} className="bg-zinc-900 flex flex-col border border-zinc-800 rounded-xl p-5 shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-white">
              {item?.data.name}
            </h2>

            <p className="text-sm text-gray-400 mt-1">{item?.data.city}</p>

            <p className="text-sm text-gray-500 mt-1">{item?.data.email}</p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-white font-medium">₹ {item?.amount}</span>

              <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-400">
                {item?.status}
              </span>
            </div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
