"use client";

import Image from "next/image";
import { Trash } from "lucide-react";

export default function CartItem({
  item,
  updateQuantity,
  removeItem,
  loading,
}) {
  const increment = () => updateQuantity(item.product._id, "increase");
  const decrement = () => updateQuantity(item.product._id, "decrease");
  const handleDelete = () => removeItem(item.product._id);

  return (
    <li className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <div className="relative w-20 h-20">
          <Image
            src={item.product.image}
            alt={item.product.name}
            fill
            className="object-cover rounded"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{item.product.name}</p>
          <p className="text-gray-500">₹{item.product.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-black">
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            onClick={decrement}
            disabled={item.quantity <= 1 || loading}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
          >
            -
          </button>
          <span className="px-3">{item.quantity}</span>
          <button
            onClick={increment}
            disabled={loading}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
          >
            +
          </button>
        </div>

        <span className="text-gray-800 font-bold">
          ₹{item.product.price * item.quantity}
        </span>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="p-2 text-red-500 hover:text-red-700 transition"
        >
          <Trash />
        </button>
      </div>
    </li>
  );
}
