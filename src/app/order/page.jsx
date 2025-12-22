"use client";
import CustomHeader from "@/components/CustomHeader";
import Footer from "@/components/Footer";
import { CartContext } from "@/context/cartContext";
import { DELIVERY_CHARGES, TAX } from "@/lib/constant";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  const [city, setCity] = useState();
  const { cartCount } = useContext(CartContext);
  const [removeCart, setRemoveCart] = useState(false);
  const router = useRouter();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, curr) => acc + Number(curr.price), 0);
  }, [cart]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, [cartCount]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  useEffect(() => {
    const userCity = JSON.parse(localStorage.getItem("user")).city;
    console.log("city", userCity);
    setCity(userCity);
  }, []);

  const handleOrder = async () => {
    let user_id = user._id;
    let resto_id = cart[0].resto_id;
    let foodItemsIds = cart.map((item) => item._id).toString();
    let delieveryBoyResponse = await fetch(
      `http://localhost:3000/api/delievery/${city}`
    );
    let delieveryBoyCity = await delieveryBoyResponse.json();

    let delieveryBoyIds = delieveryBoyCity.result.map((item) => item._id);
    let delieveryBoy_id =
      delieveryBoyIds[Math.floor(Math.random() * delieveryBoyIds.length)];
   console.log(delieveryBoy_id)
    if (!delieveryBoyIds) {
      alert("Delievery Partner not available");
      return false;
    }

    let collection = {
      user_id,
      resto_id,
      foodItemsIds,
      delieveryBoy_id,
      status: "confirm",
      amount: totalPrice + DELIVERY_CHARGES + (totalPrice * TAX) / 100,
    };

    const response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify(collection),
    });

    const result = await response.json();

    if (result.success) {
      alert("order confirmed");
      localStorage.removeItem("cart");
      setRemoveCart(true);
      router.push("/myprofile");
    } else {
      alert("order failed");
    }

    console.log("collection", collection);
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartData.length === 0) {
      router.replace("/");
    }
  }, []);

  return (
    <div className="w-full bg-black flex flex-col justify-center items-center h-screen">
      <CustomHeader removeCart={removeCart} />

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
              <span>Cash On Delievery :</span>{" "}
              <span>
                ₹{totalPrice + DELIVERY_CHARGES + (totalPrice * TAX) / 100}
              </span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="p-2 rounded-md bg-orange-600 cursor-pointer text-white mt-2"
          >
            Order Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
