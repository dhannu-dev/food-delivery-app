import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CustomHeader({ cartData }) {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    if (!cartData) return;

    setCartItem((prev) => {
      let updatedCart = [];

      if (prev?.length === 0) {
        updatedCart(cartData);
      } else if (prev?.[0].resto_id === cartData.resto_id) {
        updatedCart = [...prev, cartData];
      } else {
        updatedCart = [cartData];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, [cartData]);

  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem("cart"));
    setCartItem(cartItem);
  }, []);

  return (
    <div className="flex w-full justify-between p-5 ">
      <div>
        <h1>Food Devlivery App</h1>
      </div>
      <div className="flex gap-10">
        <Link href="/">
          <h1>Home</h1>
        </Link>
        <h1>Login</h1>
        <h1>SignUp</h1>
        <h1>Cart({cartItem ? cartItem.length : 0})</h1>
        <h1>Add Restaurent</h1>
      </div>
    </div>
  );
}
