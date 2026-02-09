"use client";
import Image from "next/image";
import { ShoppingCart, CreditCard, Plus, Minus, Book } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Spinner from "../utils/spinner";
import { useCart } from "@/context/cart-context";
import { getUserSession } from "@/lib/utils/action";
import { websiteTrack } from "@/lib/api/api";
import ImageGallery from "./image-galler";

export default function Product({ book }) {
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  function goToCheckout() {
    setLoading(true);
    websiteTrack({ type: "purchase_click" });
    const message = `Hello Sir,\n I want to order ${book.title} with quantity ${quantity}`;
    const encodedMessage = encodeURIComponent(message);

    router.push(`https://wa.me/919030565621?text=${encodedMessage}`);
    // Cookies.set("fromCheckoutAllowed", "true", { path: "/" });
    // router.push(`/checkout?type=single&productId=${book._id}&qty=${quantity}`);
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
        <ImageGallery images={book.gallery_images} title={book.title} />
        {/* Book Image */}
        {/* <div className="relative w-full md:w-1/2 h-96 md:h-auto bg-gray-100">
          <Image
            src={book.cover_image}
            alt={book.title}
            fill
            className="object-contain object-top rounded-l-2xl" // 👈 added object-top
          />
        </div> */}

        {/* Book Details */}
        <div className="p-6 flex flex-col justify-between md:w-1/2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-5">
              {book.title}
            </h1>

            {/* ✅ Key Features (before description) */}
            {book.keys && Array.isArray(book.keys) && book.keys.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Key Features
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1 leading-relaxed text-base">
                  {book.keys.map((key, index) => (
                    <li key={index}>{key}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ✅ Description */}
            {book.description && (
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {book.description}
              </p>
            )}

            {/* Price Section */}
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
              <span className="text-gray-800 font-medium text-lg">
                {quantity}
              </span>
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
            {/* <button
              disabled={cartLoading}
              onClick={(e) => handleAddToCart(e)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 rounded-md hover:from-yellow-500 hover:to-yellow-600 transition text-lg font-medium"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button> */}
            <button
              disabled={loading}
              onClick={() => goToCheckout()}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-md hover:from-gray-900 hover:to-black transition text-lg font-medium"
            >
              <CreditCard className="w-5 h-5" /> Buy Now
              {loading && (
                <span className="inline-block ml-2">
                  <Spinner />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
