"use client";

import UserLogin from "@/components/UserLogin";
import UserSignUp from "@/components/UserSignUp";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [login, setLogin] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrder(params.get("order"));
  }, []);

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
