"use client";
import { addToCartApi, getCart } from "@/lib/api/api";
import { useState, useContext, useEffect, createContext } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCart() {
    try {
      const cart = await getCart();
      if (cart) {
        setCartItems(cart.length);
      }
    } catch (e) {}
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId) => {
    const data = await addToCartApi({ product_id: productId });
    toast.success(`Added to cart!`);
    await fetchCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
