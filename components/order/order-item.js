"use client";

import Image from "next/image";

export default function OrderItem({ order }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <Image
            src={order.image}
            alt={order.title}
            fill
            className="object-cover rounded"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{order.title}</p>
          <p className="text-gray-500 text-sm">Order ID: {order.id}</p>
          <p className="text-gray-500 text-sm">Status: {order.status}</p>
        </div>
      </div>
      <div className="flex flex-col sm:items-end">
        <span className="text-gray-700 font-medium">Qty: {order.quantity}</span>
        <span className="text-gray-800 font-bold mt-1">
          ₹{order.price * order.quantity}
        </span>
      </div>
    </div>
  );
}
