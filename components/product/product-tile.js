"use client";
import Image from "next/image";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import Spinner from "../utils/spinner";
import { getUserAddress } from "@/lib/api/api";
import { getUserSession } from "@/lib/utils/action";

export default function ProductTile({ book }) {
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const router = useRouter();
  const cart = useCart();

  function handleNavigate(e) {
    if (e) {
      e.stopPropagation();
    }
    setLoading(true);
    router.push(`/product/${book._id}`);
  }
  async function handleAddToCart(e) {
    setCartLoading(true);
    if (e) {
      e.stopPropagation();
    }
    const session = await getUserSession();
    if (session.token) {
      cart.addToCart(book._id);
    } else {
      router.push("/sign-in");
    }
    setCartLoading(false);
  }
  return (
    <div
      onClick={handleNavigate}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
    >
      <div className="relative w-full h-64">
        <Image
          src={book.cover_image}
          alt={book.title}
          fill
          className="object-cover"
        />
        {/* Discount Badge */}
        {book.market_price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            {Math.round(
              ((book.market_price - book.selling_price) / book.market_price) *
                100
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {book.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 font-bold text-lg">
            ₹{book.selling_price}
          </span>
          {book.cuttedPrice && (
            <span className="text-gray-400 line-through text-sm">
              ₹{book.market_price}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          {/* <button
            onClick={(e) => handleAddToCart(e)}
            className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 text-sm rounded-md hover:from-yellow-500 hover:to-yellow-600 transition"
          >
            <ShoppingCart className="w-4 h-4" /> Add
            {cartLoading && (
              <span>
                <Spinner />
              </span>
            )}
          </button> */}
          <button
            onClick={(e) => handleNavigate(e)}
            className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 text-sm rounded-md hover:from-gray-900 hover:to-black transition"
          >
            <CreditCard className="w-4 h-4" /> Buy
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
