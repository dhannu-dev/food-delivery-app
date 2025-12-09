"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !name) {
      setError("Please enter the field");
      return;
    }

    const user = { name, email, password };

    let response = await fetch("http://localhost:3000/api/restaurent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    response = await response.json();
    console.log("response", response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurentUser", JSON.stringify(result));
      router.push("/restaurent/dashboard");
    }

    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="flex w-full justify-center items-center flex-col">
      <h1>Signup</h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label>Username</label>
          <input
            className="px-2 py-1.5 w-[300px] rounded-md outline-none border-zinc-500 border "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label>Email</label>
          <input
            className="px-2 py-1.5 w-[300px] rounded-md outline-none border-zinc-500 border "
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label>Password</label>
          <input
            className="p-2 rounded-md w-[300px] outline-none border-zinc-500 border "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        <button
          onClick={handleSignup}
          className="p-2 rounded-md border w-full mt-3 cursor-pointer bg-white text-black"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
