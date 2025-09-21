"use client";

import { ShoppingCart, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CartItem from "./cart-item";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Physics Olympiad Guide",
      price: 499,
      quantity: 2,
      image: "/books/physics.jpg",
    },
    {
      id: 2,
      title: "Chemistry for IIT",
      price: 599,
      quantity: 1,
      image: "/books/chemistry.jpg",
    },
    {
      id: 3,
      title: "Biology NEET Prep",
      price: 399,
      quantity: 3,
      image: "/books/biology.jpg",
    },
  ]);

  const updateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const cartCount = cartItems.length;
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
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
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
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

            <Link
              href="/checkout"
              className="mt-6 w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
