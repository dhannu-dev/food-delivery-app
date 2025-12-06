"use client";
import React, { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !name) return;

    const user = { name, email, password };

    let result = await fetch("http://localhost:3000/api/restaurent", {
      method: "POST",
      body: JSON.stringify(user),
    });

    console.log(result);

    setName("");
    setEmail("");
    setPassword("");
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
