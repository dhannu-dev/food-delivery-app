"use client";
import DeleiveryHeader from "@/components/DelieveryHeader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DelieveryMan() {
  const [login, setLogin] = useState(true);
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter()

  const handleSignup = async () => {
    if (!(name, city, password, mobile)) {
      alert("all field are required");
      return;
    }
    try {
      const response = await fetch(
        "/api/delievery/signup",
        {
          method: "POST",
          body: JSON.stringify({ name, city, password, mobile }),
        }
      );
      const data = await response.json();
      console.log("data", data)
      if (data.success) {
        const { result } = data;
        delete result.password;
        localStorage.setItem("delievery", JSON.stringify(result));
        router.push("/delieveryDashboard")
        setName("");
        setCity("");
        setMobile("");
        setPassword("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = async() => {
    if(!loginMobile || !loginPassword){
        alert("all field are required");
        return;
    }

    try {
        const response = await fetch("/api/delievery/login", {
            method: "POST",
            body : JSON.stringify({mobile : loginMobile, password : loginPassword})
        });

        const data = await response.json();
        console.log("data", data)
        if(data.success){
            const {result} = data;
            delete result.password;
            localStorage.setItem("delievery", JSON.stringify(result));
            router.push("/delieveryDashboard")
        }
    } catch (error) {
            console.log(error.message)
    }
  }

  return (
    <div className="flex h-screen items-center flex-col">
      <DeleiveryHeader />
      {login ? (
        <div className="p-2 text-center h-screen flex flex-col justify-center items-center gap-3">
          <h1 className="text-xl mb-1">Login Deleivery Man</h1>
          <input
            type="text"
            placeholder="enter mobile"
            value={loginMobile}
            onChange={(e) => setLoginMobile(e.target.value)}
            className="p-2 rounded-md border outline-none w-[300px] "
          />
          <input
            type="password"
            placeholder="enter password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="p-2 rounded-md border outline-none w-[300px] "
          />
          <button onClick={handleLogin} className="w-full bg-white text-black p-2 rounded-md hover:bg-zinc-300 hover:text-black cursor-pointer">
            Login
          </button>
          <p
            onClick={() => setLogin(false)}
            className="cursor-pointer hover:text-zinc-300"
          >
            Don't have an account ? SignUp
          </p>
        </div>
      ) : (
        <div className="flex flex-col h-screen justify-center items-center gap-3">
          <h1 className="text-center text-xl">SignUp Delievery Man</h1>
          <div className="flex flex-col gap-1">
            <label>Name</label>
            <input
              className="px-2 py-1.5 w-[300px] rounded-md outline-none border-zinc-500 border "
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <div className="flex flex-col gap-1.5">
            <label>Mobile</label>
            <input
              className="px-2 py-1.5 w-[300px] rounded-md outline-none border-zinc-500 border "
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>City</label>
            <input
              className="px-2 py-1.5 w-[300px] rounded-md outline-none border-zinc-500 border "
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button
            onClick={handleSignup}
            className="p-2 rounded-md border w-full mt-3 cursor-pointer bg-white text-black"
          >
            Signup
          </button>
          <p
            onClick={() => setLogin(true)}
            className="cursor-pointer hover:text-zinc-300 text-center"
          >
            Don't have an account ? SignUp
          </p>
        </div>
      )}
    </div>
  );
}
