"use client";
import CustomHeader from "@/components/CustomHeader";
import Footer from "@/components/Footer";
import { CartContext } from "@/context/cartContext";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function RestaurentDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [products, setProducts] = useState([]);
  const {cartCount, setCartCount, handleRemoveFromCart } = useContext(CartContext);

  useEffect(() => {
    fetchRestaurentData();
  }, []);

  const fetchRestaurentData = async () => {
    const response = await fetch(`http://localhost:3000/api/customer/${id}`);
    const data = await response.json();
    if (data.success) {
      console.log("data", data);
      setDetails(data.result);
      setProducts(data.foodItem);
    }
  };

  const handleCartData = (product) => {
    const storedRestoId = JSON.parse(localStorage.getItem("cartRestoId"));

    if (storedRestoId && storedRestoId !== id) {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartRestoId");
    }

    const freshCart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyInCart = freshCart.find((item) => item._id === product._id);
    if (alreadyInCart) {
      alert("Already in Cart");
      return;
    }

    const updatedCart = [...freshCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartRestoId", JSON.stringify(id));

    setCartCount(updatedCart.map((item) => item._id));
    alert("Product are added to cart");
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("cart")) || [];
    const ids = products?.map((product) => product._id);
    setCartCount(ids);
  }, []);

  return (
    <div className="">
      <CustomHeader />
      <div className="flex items-center relative">
        <img src="/banner.jpg" className="w-full opacity-50" />
        <div className="absolute left-9">
          <h1 className="mb-5 text-3xl text-zinc-300 font-semibold text-center">
            {details?.[0]?.name &&
              details[0].name.charAt(0).toUpperCase() +
                details[0].name.slice(1)}
          </h1>
        </div>
      </div>
      <div className="w-full flex p-5 gap-4 ">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <div
                key={product._id}
                className=" bg-zinc-900 shadow hover:-translate-y-1 transition-all rounded-2xl "
              >
                <div className="w-[300px] h-[200px] rounded-2xl">
                  <img
                    src={product.path}
                    className=" w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="flex m-2 flex-col">
                  <p className="text-orange-600 font-semibold">
                    {product.name.charAt(0).toUpperCase() +
                      product.name.slice(1)}
                  </p>
                  <p className="text-zinc-400">₹{product.price}</p>
                  <p className="text-zinc-400">{product.description}</p>
                </div>
                {cartCount?.includes(product._id) ? (
                  <button
                    onClick={() => handleRemoveFromCart(product._id)}
                    className="p-2 w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white rounded-b-2xl"
                  >
                    Remove From Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleCartData(product)}
                    className="p-2 w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white rounded-b-2xl"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p>There are no Products</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
