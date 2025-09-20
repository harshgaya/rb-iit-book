import Image from "next/image";
import { ShoppingCart, CreditCard } from "lucide-react";

export default function ProductTile({ book }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
      {/* Book Image */}
      <div className="relative w-full h-64">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover"
        />
        {/* Discount Badge */}
        {book.cuttedPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            {Math.round(
              ((book.cuttedPrice - book.price) / book.cuttedPrice) * 100
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {book.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 font-bold text-lg">
            ₹{book.price}
          </span>
          {book.cuttedPrice && (
            <span className="text-gray-400 line-through text-sm">
              ₹{book.cuttedPrice}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 text-sm rounded-md hover:from-yellow-500 hover:to-yellow-600 transition">
            <ShoppingCart className="w-4 h-4" /> Add
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 text-sm rounded-md hover:from-gray-900 hover:to-black transition">
            <CreditCard className="w-4 h-4" /> Buy
          </button>
        </div>
      </div>
    </div>
  );
}
