"use client";

import Image from "next/image";
import { useState } from "react";

export default function CartItem({ item, updateQuantity }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const increment = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateQuantity(item.id, newQty);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      updateQuantity(item.id, newQty);
    }
  };

  return (
    <li className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <div className="relative w-20 h-20">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover rounded"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{item.title}</p>
          <p className="text-gray-500">₹{item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-black">
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            onClick={decrement}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 transition"
          >
            -
          </button>
          <span className="px-3">{quantity}</span>
          <button
            onClick={increment}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>
        <span className="text-gray-800 font-bold">
          ₹{item.price * quantity}
        </span>
      </div>
    </li>
  );
}
