import { CartContext } from "@/context/cartContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

export default function CustomHeader() {
  const {cartCount} = useContext(CartContext)
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
        <Link href="/cart">
          <h1>Cart({cartCount.length})</h1>
        </Link>
        <h1>Add Restaurent</h1>
      </div>
    </div>
  );
}
