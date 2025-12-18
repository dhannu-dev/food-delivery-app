"use client";
const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.map((item) => item._id));
  }, []);

  const handleRemoveFromCart = (productId) => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    const updatedCart = cartData.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.map((item) => item._id));
    alert("Product are removed from cart");
  };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, handleRemoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
