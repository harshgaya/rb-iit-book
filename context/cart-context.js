"use client";
import { addToCartApi, getCart } from "@/lib/api/api";
import { useState, useContext, useEffect, createContext } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  function setCartToEmpty() {
    setCartItems(0);
  }

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
    if (data) {
      toast.success(`Added to cart!`);
    } else {
      toast.error(`Failed to add to cart!`);
    }

    await fetchCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, setCartToEmpty }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
