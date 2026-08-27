"use client";
import Image from "next/image";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../utils/spinner";

export default function ProductTile({ book }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleNavigate(e) {
    if (e) {
      e.stopPropagation();
    }
    setLoading(true);
    router.push(`/product/${book._id}`);
  }

  return (
    <div
      onClick={handleNavigate}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative w-full h-64">
        <Image
          src={book.cover_image}
          alt={book.title}
          height={100}
          width={200}
          className="object-cover"
        />
        {book.market_price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            {Math.round(
              ((book.market_price - book.selling_price) / book.market_price) *
                100,
            )}
            % OFF
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {book.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 font-bold text-lg">
            ₹{book.selling_price}
          </span>
          {book.market_price && (
            <span className="text-gray-400 line-through text-sm">
              ₹{book.market_price}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={(e) => handleNavigate(e)}
            className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 text-sm rounded-md hover:from-gray-900 hover:to-black transition"
          >
            <CreditCard className="w-4 h-4" /> View Details
            {loading && (
              <span>
                <Spinner />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
