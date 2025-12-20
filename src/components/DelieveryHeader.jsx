"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleiveryHeader() {
  const router = useRouter();

  useEffect(() => {
    const delievery = JSON.parse(localStorage.getItem("delievery"))
    if (!delievery) {
      router.push("/delieveryPartner");
    }
  }, []);

  return (
    <div className="flex w-full justify-between p-5 ">
      <div>
        <h1>Food Devlivery App</h1>
      </div>
      <div className="flex gap-10">
        <Link href="/">
          <h1>Home</h1>
        </Link>
      </div>
    </div>
  );
}
