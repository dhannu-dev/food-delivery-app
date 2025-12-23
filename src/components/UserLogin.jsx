import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function UserLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("data", data);
      if (data.success) {
        const { result } = data;
        delete result.password;
        localStorage.setItem("user", JSON.stringify(result));
        if (props.redirect) {
          router.push("/order");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-center text-xl mb-3">User Login Form</h1>
        <div className="flex mb-3 justify-between items-center gap-10 bg-zinc-200 p-2 rounded-md text-black">
          <Link href="/user-auth">
            <h1 className="cursor-pointer">User</h1>
          </Link>
          <Link href="/delieveryPartner">
            <h1 className="cursor-pointer">Delivery Boy</h1>
          </Link>
          <Link href="/restaurent">
            <h1 className="cursor-pointer">Restaurent</h1>
          </Link>
        </div>
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
        <button
          onClick={handleLogin}
          className="p-2 rounded-md bg-white text-black mt-3 cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
