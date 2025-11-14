"use client";

import { Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import CartItem from "./cart-item";
import { updateCart } from "@/lib/api/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Spinner from "../utils/spinner";

export default function CartPage({ cart }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(cart || []);
  const [loading, setLoading] = useState(false);
  const [navigating, setNavigating] = useState(false);
  function checkout() {
    setNavigating(true);
    Cookies.set("fromCheckoutAllowed", "true", { path: "/" });
    router.push(` /checkout?type=cart`);
  }

  // Update quantity API
  const updateQuantity = async (id, action) => {
    try {
      setLoading(true);
      const res = await updateCart({ product_id: id, action });
      if (res) {
        setCartItems(res);
        toast.success("Cart updated!");
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Remove item API
  const removeItem = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!confirmed) return;

      setLoading(true);
      const res = await updateCart({ product_id: id, action: "delete" });
      if (res) {
        setCartItems(res);
        toast.success("Item removed!");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const cartCount = cartItems.length;
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Cart
      </h1>

      {cartCount === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Package className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-4">No items in your cart</p>
          <Link
            href="/products"
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                loading={loading}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full md:w-96 bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Delivery</span>
                <span>₹0</span>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-4 flex justify-between text-gray-800 font-bold text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              disabled={navigating}
              onClick={checkout}
              className="mt-6 w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition text-center"
            >
              Proceed to Checkout
              {navigating && (
                <span className="inline-block align-middle ml-2">
                  <Spinner />
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
