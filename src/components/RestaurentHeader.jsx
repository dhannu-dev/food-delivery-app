"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RestaurentHeader() {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("restaurentUser");
    if (!data) {
      router.push("/restaurent");
    } else if (data && pathName == "/restaurent") {
      router.push("/restaurent/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("restaurentUser");
    router.push("/restaurent");
  };

  return (
    <div className="flex w-full justify-between p-5 ">
      <div>
        <h1>Food Devlivery App</h1>
      </div>
      <div className="flex gap-10">
        <Link href="/"><h1>Home</h1></Link>
        {details ? (
          <h1 className="cursor-pointer" onClick={handleLogout}>
            Logout
          </h1>
        ) : (
          <h1>Login/SignUp</h1>
        )}
        <h1>Profile</h1>
      </div>
    </div>
  );
}
