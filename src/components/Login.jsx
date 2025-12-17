import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    let response = await fetch("http://localhost:3000/api/restaurent", {
      method: "POST",
      body: JSON.stringify({ email, password, login: true }),
    });

    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurentUser", JSON.stringify(result));
      router.push("/restaurent/dashboard");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h1>Login</h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label>Email</label>
          <input
            className="px-2 py-1.5 w-[300px] rounded-md outline-none border-zinc-500 border "
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <p className="text-center  text-red-500 mt-2">
              Please enter valid email
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label>Password</label>
          <input
            className="p-2 rounded-md w-[300px] outline-none border-zinc-500 border "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <p className="text-center  text-red-500 mt-2">
              Please enter valid password
            </p>
          )}
        </div>

        <button
          onClick={handleLogin}
          className="p-2 rounded-md border w-full mt-3 cursor-pointer bg-white text-black hover:bg-black hover:text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}
