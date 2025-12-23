"use client";

import UserLogin from "@/components/UserLogin";
import UserSignUp from "@/components/UserSignUp";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function AuthContent() {
  const [login, setLogin] = useState(true);
  const searchParams = useSearchParams();
  const order = searchParams.get("order");

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {login ? (
        <UserLogin redirect={order} />
      ) : (
        <UserSignUp redirect={order} />
      )}

      <div
        className="mt-2 text-white cursor-pointer"
        onClick={() => setLogin(!login)}
      >
        {login
          ? "Do not have an account ? SignUp"
          : "Already have an account ? Login"}
      </div>
    </div>
  );
}
