"use client";
import Image from "next/image";
import { ShoppingCart, CreditCard, Plus, Minus, Book } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Product({ book }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!book) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <Book className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-500 text-xl">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-8">
        {/* Book Image */}
        <div className="relative w-full md:w-1/2 h-96 md:h-auto">
          <Image
            src={book.cover_image}
            alt={book.title}
            fill
            className="object-contain rounded-l-2xl" // changed from object-cover
          />
        </div>

        {/* Book Details */}
        <div className="p-6 flex flex-col justify-between md:w-1/2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {book.title}
            </h1>
            <p className="text-gray-700 mb-6">{book.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-yellow-500 font-bold text-2xl">
                ₹{book.selling_price}
              </span>
              {book.market_price && (
                <span className="text-gray-400 line-through text-lg">
                  ₹{book.market_price}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={decreaseQuantity}
                className="p-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-gray-800 font-medium">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="p-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 rounded-md hover:from-yellow-500 hover:to-yellow-600 transition">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button
              onClick={() =>
                router.push(
                  `/checkout?type=single&productId=${book._id}&qty=${quantity}`
                )
              }
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-md hover:from-gray-900 hover:to-black transition"
            >
              <CreditCard className="w-5 h-5" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
