"use client";
import CustomHeader from "@/components/CustomHeader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RestaurentDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchRestaurentData();
  }, []);

  const fetchRestaurentData = async () => {
    const response = await fetch(`http://localhost:3000/api/customer/${id}`);
    const data = await response.json();
    if (data.success) {
      console.log("data", data);
      setDetails(data.result);
      setProducts(data.foodItem);
    }
  };

  useEffect(() => {
    console.log(details);
    console.log(products);
  }, [details, products]);

  return (
    <div className="">
      <CustomHeader />
      <div className="flex items-center relative">
        <img src="/banner.jpg" className="w-full opacity-50" />
        <div className="absolute left-9">
          <h1 className="mb-5 text-3xl text-zinc-300 font-semibold text-center">
            {details?.[0]?.name &&
              details[0].name.charAt(0).toUpperCase() +
                details[0].name.slice(1)}
          </h1>
        </div>
      </div>
      <div className="w-full flex p-5 gap-4 ">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <div
                key={product._id}
                className=" bg-zinc-900 shadow hover:-translate-y-1 transition-all rounded-2xl "
              >
                <div className="w-[300px] h-[200px] rounded-2xl">
                  <img
                    src={product.path}
                    className=" w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="flex m-2 flex-col">
                  <p className="text-orange-600 font-semibold">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</p>
                <p className="text-zinc-400">₹{product.price}</p>
                <p className="text-zinc-400">{product.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>There are no Products</p>
        )}
      </div>
    </div>
  );
}
