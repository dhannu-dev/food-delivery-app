"use client";
import { CartContext } from "@/context/cartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function CustomHeader({ removeCart }) {
  const { cartCount } = useContext(CartContext);
  const [user, setUser] = useState();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null)
    router.push("/user-auth");
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if(userData){
      setUser(userData)
    }
  }, []);

  useEffect(() => {
    if (removeCart) {
      localStorage.removeItem("cart");
    }
  }, [removeCart]);

  const handleProfile = () => {
    router.push("/myprofile");
  };

  return (
    <div className="flex w-full justify-between p-5 ">
      <div>
        <h1>Food Devlivery App</h1>
      </div>
      <div className="flex gap-10">
        <Link href="/">
          <h1>Home</h1>
        </Link>
        {user ? (
          <div className="flex justify-between items-center gap-10">
            <h1 onClick={handleProfile}>
              {user?.name
                ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                : ""}
            </h1>

            <button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-10">
            <h1>Login</h1>
            <h1>SignUp</h1>
          </div>
        )}
        <Link href="/cart">
          <h1>Cart({cartCount?.length || 0})</h1>
        </Link>
        <h1>Add Restaurent</h1>
      </div>
    </div>
  );
}
