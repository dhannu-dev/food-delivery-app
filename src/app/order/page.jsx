"use client";
import CustomHeader from "@/components/CustomHeader";
import Footer from "@/components/Footer";
import { CartContext } from "@/context/cartContext";
import { DELIVERY_CHARGES, TAX } from "@/lib/constant";
import React, { useContext, useEffect, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  const { cartCount } = useContext(CartContext);

  const totalPrice = cart.reduce((acc, curr) => {
    return acc + Number(curr.price);
  }, 0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    setCart(cartData);
  }, [cartCount]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  return (
    <div className="w-full bg-black flex flex-col justify-center items-center h-screen">
      <CustomHeader />

      <div className="flex flex-1 ">
        <div className="flex justify-center items-center flex-col gap-10 p-5">
          <div className="flex w-[350px] flex-col gap-1">
            <h1 className="text-center text-orange-600">User Details</h1>
            <div className="flex justify-between items-center">
              <span>Name :</span> <span>{user?.name}</span>
            </div>
            <div className="flex  justify-between items-center">
              <span>email</span> <span>{user?.email}</span>
            </div>
            <div className="flex  justify-between items-center">
              <span>Address :</span> <span>{user?.address}</span>
            </div>
            <div className="flex  justify-between items-center">
              <span>city</span> <span>{user?.city}</span>
            </div>
            <div className="flex  justify-between items-center">
              <span>Phone Number</span> <span>+91 {user?.phone}</span>
            </div>
          </div>

          <div className="flex flex-col w-[350px] gap-1">
            <h1 className="text-center text-orange-600 ">Order Details</h1>
            <div className="flex justify-between items-center">
              <span>Food Charges :</span> <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tax :</span> <span>₹{(totalPrice * TAX) / 100}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Delievery Charges :</span> <span>₹{DELIVERY_CHARGES}</span>
            </div>
            <div className="flex  justify-between items-center">
              <span>Total Price :</span>{" "}
              <span>
                ₹{totalPrice + DELIVERY_CHARGES + (totalPrice * TAX) / 100}
              </span>
            </div>
          </div>

          <div className="flex flex-col w-[350px] gap-1">
            <h1 className="text-center text-orange-600 ">Payment Mode</h1>
            <div className="flex justify-between items-center">
              <span>Cash On Delievery :</span> <span>₹{totalPrice}</span>
            </div>
             
          </div>
          <button className="p-2 rounded-md bg-orange-600 cursor-pointer text-white mt-2">
            Order Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
