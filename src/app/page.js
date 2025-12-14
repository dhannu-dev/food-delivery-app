"use client";
import CustomHeader from "@/components/CustomHeader";
import { useEffect, useState } from "react";

export default function Page() {
  const [cityName, setCityName] = useState("");
  const [city, setCity] = useState([]);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const response = await fetch(
      "http://localhost:3000/api/customer/locations"
    );
    const data = await response.json();
    console.log("data", data);
    setCity(data.result);
  };

  const filterData = city.filter((item) =>
    item.toLowerCase().includes(cityName.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full flex-col">
      <CustomHeader />
      <div className="flex items-center relative">
        <img src="/banner.jpg" className="w-full opacity-50" />
        <div className="absolute left-9">
          <h1 className="mb-5 text-2xl font-semibold text-center">
            Food Delivery App
          </h1>
          <div className="flex ">
            <div className="flex flex-col relative">
              <input
                placeholder="Select Place"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                type="text"
                className="border-2 border-zinc-300 p-2 w-[400px] outline-none"
              />

              <div className="absolute top-11">
                {cityName && (
                  <ul className=" w-[400px] ">
                    {filterData.map((item) => (
                      <li className="hover:bg-zinc-800 rounded-md hover:text-white cursor-pointer p-2" key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <input
              type="text"
              placeholder="Enter Food or Restaurent"
              className=" border-zinc-300 border-2 p-2 w-[400px] ml-3 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
