"use client";
import CustomHeader from "@/components/CustomHeader";
import Footer from "@/components/Footer";
import { CartContext } from "@/context/cartContext";
import { DELIVERY_CHARGES, TAX } from "@/lib/constant";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState([]);
  const { cartCount, handleRemoveFromCart } = useContext(CartContext);
  const router = useRouter();

  const totalPrice = cart.reduce((acc, curr) => {
    return acc + Number(curr.price);
  }, 0);

  console.log("totalPrice", totalPrice);
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    setCart(cartData);
  }, [cartCount]);

  const handleOrder = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      alert("please create an account and then place an order")
      router.push("/user-auth?order=true");
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      <CustomHeader />

      <div className="flex flex-1 ">
        {cart && cart.length > 0 ? (
          <div className="flex flex-col gap-4 w-full p-6 rounded-xl">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 items-center bg-zinc-800 p-4 rounded-lg"
              >
                <img
                  src={item.path}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex flex-col text-zinc-500 w-full">
                  <div className="flex items-center justify-between w-full">
                    <p className="font-semibold text-zinc-300">{item.name}</p>

                    <p className="text-white">Price : ₹{item.price}</p>
                  </div>

                  <p className="text-zinc-300 mb-2">{item.description}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="p-2 rounded-md bg-orange-600 w-[150px] text-white"
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center mb-14 p-5">
              <div className="flex flex-col gap-1">
                <div className="flex w-[250px] justify-between items-center">
                  <span>Food Charges :</span> <span>₹{totalPrice}</span>
                </div>
                <div className="flex w-[250px] justify-between items-center">
                  <span>Tax :</span> <span>₹{(totalPrice * TAX) / 100}</span>
                </div>
                <div className="flex w-[250px] justify-between items-center">
                  <span>Delievery Charges :</span>{" "}
                  <span>₹{DELIVERY_CHARGES}</span>
                </div>
                <div className="flex w-[250px] justify-between items-center">
                  <span>Total Price :</span>{" "}
                  <span>
                    ₹{totalPrice + DELIVERY_CHARGES + (totalPrice * TAX) / 100}
                  </span>
                </div>

                <button
                  onClick={handleOrder}
                  className="p-2 rounded-md bg-orange-600 cursor-pointer text-white mt-2"
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-white w-full mt-10 font-semibold text-xl text-center">
            Cart is empty
          </h1>
        )}
      </div>

      <Footer />
    </div>
  );
}
