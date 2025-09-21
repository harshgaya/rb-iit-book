"use client";

import { useState } from "react";

import OrderItem from "./order-item";

export default function OrdersPage() {
  // Dummy orders
  const [orders] = useState([
    {
      id: "ORD12345",
      title: "Physics Olympiad Guide",
      price: 499,
      quantity: 1,
      status: "Delivered",
      image: "/books/physics.jpg",
    },
    {
      id: "ORD12346",
      title: "Chemistry for IIT",
      price: 599,
      quantity: 2,
      status: "Shipped",
      image: "/books/chemistry.jpg",
    },
    {
      id: "ORD12347",
      title: "Biology NEET Prep",
      price: 399,
      quantity: 1,
      status: "Processing",
      image: "/books/biology.jpg",
    },
  ]);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">No orders found.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}
