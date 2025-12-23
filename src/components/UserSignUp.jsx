"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function UserSignUp(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    phone: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !(
        formData.name ||
        formData.email ||
        formData.password ||
        formData.city ||
        formData.address ||
        formData.phone
      )
    ) {
      alert("Please enter all required field");
      return;
    }
    let response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
      }),
    });
    const data = await response.json();
    if (data.success) {
      const { result } = data;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (props.redirect) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("failed");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      address: "",
      city: "",
      phone: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h1 className="text-center text-xl">
            User Signup Form
          </h1>
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
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Enter Name"
            className=" p-2 rounded-md w-[300px] outline-none border border-zinc-300"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter Email"
            className=" p-2 rounded-md w-[300px] outline-none border border-zinc-300"
          />
          <input
            name="password"
            value={formData.password}
            type="password"
            onChange={handleChange}
            placeholder="Enter Password"
            className=" p-2 rounded-md w-[300px] outline-none border border-zinc-300"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            type="text"
            placeholder="Enter Address"
            className=" p-2 rounded-md w-[300px] outline-none border border-zinc-300"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            type="text"
            placeholder="Enter City"
            className=" p-2 rounded-md w-[300px] outline-none border border-zinc-300"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="text"
            placeholder="Enter Phone Number"
            className=" p-2 rounded-md w-[300px] outline-none border border-zinc-300"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-white text-black p-2 hover:bg-black hover:text-white cursor-pointer"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
