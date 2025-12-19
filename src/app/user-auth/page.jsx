"use client";
import UserLogin from "@/components/UserLogin";
import UserSignUp from "@/components/UserSignUp";
import React, { useState } from "react";

export default function Page() {
  const [login, setLogin] = useState(true);
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {login ? <UserLogin /> : <UserSignUp />}
      <div className="mt-2 text-white cursor-pointer" onClick={() => setLogin(!login)}>
        {login ? (
          <h1>Do not have an account ? SignUp</h1>
        ) : (
          <h1>Already hava an account ? Login</h1>
        )}
      </div>
    </div>
  );
}
