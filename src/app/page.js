"use client";
import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [cityName, setCityName] = useState("");
  const [city, setCity] = useState([]);
  const [showList, setShowList] = useState(false);
  const [restaurent, setRestaurent] = useState([]);
  const router = useRouter()

  useEffect(() => {
    loadLocation();
    loadRestaurents();
  }, []);

  const loadLocation = async () => {
    const response = await fetch(
      "http://localhost:3000/api/customer/locations"
    );
    const data = await response.json();
    setCity(data.result);
  };

  const loadRestaurents = async (params) => {
    let url = "http://localhost:3000/api/customer";
    console.log(params);
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurent) {
      url = url + "?restaurent=" + params.restaurent;
    }
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setRestaurent(data.result);
    }
  };

  const handleChange = (e) => {
    setCityName(e.target.value);
    setShowList(true);
  };

  const handleAssignCityName = (name) => {
    setCityName(name);
    setShowList(false);
    loadRestaurents({ location: name });
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
                onChange={handleChange}
                type="text"
                className="border-2 border-zinc-300 p-2 w-[400px] outline-none"
              />

              <div className="absolute top-11">
                {showList && (
                  <ul className=" w-[400px] ">
                    {filterData.map((item) => (
                      <li
                        onClick={() => handleAssignCityName(item)}
                        className="hover:bg-zinc-800 rounded-md hover:text-white cursor-pointer p-2"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <input
              type="text"
              placeholder="Enter Food or Restaurent"
              onChange={(e) => loadRestaurents({ restaurent: e.target.value })}
              className=" border-zinc-300 border-2 p-2 w-[400px] ml-3 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {restaurent.map((cur, idx) => {
          return (
            <div
              key={idx}
              onClick={() => router.push(`explore/${cur._id}`)}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <h2 className="text-xl font-bold text-white">{cur.name}</h2>

              <p className="text-orange-500 mt-2 flex items-center gap-2">
                📍 {cur.city}
              </p>

              <p className="text-sm text-gray-400 mt-1">{cur.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
