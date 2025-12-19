"use client";
import UserLogin from "@/components/UserLogin";
import UserSignUp from "@/components/UserSignUp";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [login, setLogin] = useState(true);
  const searchParams = useSearchParams();
  const order = searchParams.get("order"); // ✅ SAFE

  console.log("order flag:", order);
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {login ? <UserLogin  redirect = {order}  /> : <UserSignUp redirect = {order}  />}
      <div
        className="mt-2 text-white cursor-pointer"
        onClick={() => setLogin(!login)}
      >
        {login ? (
          <h1>Do not have an account ? SignUp</h1>
        ) : (
          <h1>Already hava an account ? Login</h1>
        )}
      </div>
    </div>
  );
}
