import React, { useState } from "react";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-center text-xl">Login User</h1>
        <div className="flex flex-col gap-1.5">
          <label>Email</label>
          <input
            className="p-2 rounded-md w-[300px] outline-none border-zinc-500 border "
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
        <button className="p-2 rounded-md bg-white text-black mt-3 cursor-pointer">
          Login
        </button>
      </div>
    </div>
  );
}
