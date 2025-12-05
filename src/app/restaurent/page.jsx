"use client";
import Login from "@/components/Login";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import RestaurentHeader from "@/components/RestaurentHeader";
import SignUp from "@/components/SignUp";

export default function Resturent() {
  const [login, setLogin] = useState(true);
  return (
    <div className="min-h-screen flex flex-col w-full">
      <RestaurentHeader />

      <div className="flex-1 w-full flex flex-col justify-center items-center">
        <h1 className="text-xl font-semibold mb-4">
          Restaurant Login/Signup Page
        </h1>

        {login ? <Login /> : <SignUp />}

        <button
          className="mt-4 cursor-pointer"
          onClick={() => setLogin((prev) => !prev)}
        >
          {login
            ? "Do not have account ? Signup"
            : "Already have an account ? Login"}
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
