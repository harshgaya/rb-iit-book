"use client";

import { useState } from "react";

import OrderItem from "./order-item";

export default function OrdersPage({ orders }) {
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
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}
