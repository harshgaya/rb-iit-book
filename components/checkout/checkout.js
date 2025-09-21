"use client";

import Image from "next/image";
import { useState } from "react";

export default function CheckoutPage() {
  const [cartItems] = useState([
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
  ]);

  const userAddress = {
    name: "Harsh Kumar",
    street: "123, MG Road",
    city: "Delhi",
    state: "Delhi",
    zip: "110001",
    phone: "9876543210",
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Shipping Address (Read-only) */}
        <div className="flex-1 bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Shipping Address
          </h2>
          <div className="text-gray-900 space-y-1">
            <p className="font-medium">{userAddress.name}</p>
            <p>{userAddress.street}</p>
            <p>
              {userAddress.city}, {userAddress.state} - {userAddress.zip}
            </p>
            <p>Phone: {userAddress.phone}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex-1 bg-white shadow rounded-lg p-6 flex flex-col gap-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center gap-4 border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm">x{item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-semibold mt-4 border-t pt-4">
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>

          {/* Payment Method */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-gray-900">
                <input
                  type="radio"
                  name="payment"
                  className="accent-yellow-500"
                />
                <span>Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-2 text-gray-900">
                <input
                  type="radio"
                  name="payment"
                  className="accent-yellow-500"
                />
                <span>UPI</span>
              </label>
              <label className="flex items-center gap-2 text-gray-900">
                <input
                  type="radio"
                  name="payment"
                  className="accent-yellow-500"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition text-lg font-semibold">
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
