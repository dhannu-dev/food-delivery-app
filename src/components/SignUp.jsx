import React from "react";

export default function SignUp() {
  return (
    <div className="flex w-full justify-center items-center flex-col">
      <h1>Signup</h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label>Email</label>
          <input
            className="px-2 py-1.5 w-[300px] rounded-md outline-none border-zinc-500 border "
            type="email"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label>Password</label>
          <input
            className="p-2 rounded-md w-[300px] outline-none border-zinc-500 border "
            type="password"
          />
        </div>
      </div>
    </div>
  );
}
