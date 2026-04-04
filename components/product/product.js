"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactPixel from "react-facebook-pixel";

import {
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiStar,
} from "react-icons/fi";
import { BsWhatsapp, BsFillPatchCheckFill } from "react-icons/bs";
import { SiFlipkart, SiAmazon } from "react-icons/si";
import { useCart } from "@/context/cart-context";
import { getUserSession } from "@/lib/utils/action";
import { websiteTrack } from "@/lib/api/api";
import Spinner from "../utils/spinner";
import ImageGallery from "./image-galler";

const TRUST_BADGES = [
  { icon: FiShield, label: "Secure Payment" },
  { icon: FiTruck, label: "Fast Delivery" },
  { icon: FiRotateCcw, label: "Easy Returns" },
  { icon: BsFillPatchCheckFill, label: "100% Genuine" },
];

export default function Product({ book }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const router = useRouter();
  const cart = useCart();

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const discount =
    book?.market_price && book?.selling_price
      ? Math.round(
          ((book.market_price - book.selling_price) / book.market_price) * 100,
        )
      : null;

  function buyOnWhatsapp() {
    setLoading(true);
    ReactPixel.track("Whatspp_purchase", {
      value: book.selling_price,
      currency: "INR",
    });
    websiteTrack({ type: "purchase_click" });
    const msg = `Hello Sir,\nI want to order *${book.title}* × ${quantity}`;
    router.push(`https://wa.me/919030565621?text=${encodeURIComponent(msg)}`);
  }

  async function handleAddToCart(e) {
    e?.stopPropagation();
    setCartLoading(true);
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
        <FiShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-400 text-lg font-medium">Product not found.</p>
      </main>
    );
  }

  // Shared buy button group — used on desktop inline & mobile sticky bar
  const BuyButtons = () => (
    <div className="flex flex-col gap-3">
      <button
        onClick={buyOnWhatsapp}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#17a84f] text-white font-bold text-base py-3.5 rounded-xl transition-all duration-150 shadow-sm disabled:opacity-70"
      >
        <BsWhatsapp className="text-xl" />
        Buy on WhatsApp
        {loading && <Spinner />}
      </button>

      <div className="grid grid-cols-2 gap-3">
        <a
          href={book.flipkart_url || "#"}
          onClick={ReactPixel.track("Flipkart_purchase", {
            value: book.selling_price,
            currency: "INR",
          })}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-[#F9A825] hover:bg-[#f0a000] text-white font-bold text-sm py-3 rounded-xl transition-all duration-150 shadow-sm"
        >
          <SiFlipkart className="text-lg" />
          Flipkart
        </a>
        <a
          href={book.amazon_url || "#"}
          onClick={ReactPixel.track("Amazon_purchase", {
            value: book.selling_price,
            currency: "INR",
          })}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#e68a00] text-white font-bold text-sm py-3 rounded-xl transition-all duration-150 shadow-sm"
        >
          <SiAmazon className="text-lg" />
          Amazon
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/*
        pb-36 on mobile gives breathing room so content isn't hidden
        behind the sticky bottom bar. Removed on md+.
      */}
      <main className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 pb-40 md:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left — Image gallery */}
              <div className="w-full md:w-[45%] md:border-r border-gray-100">
                <ImageGallery images={book.gallery_images} title={book.title} />
              </div>

              {/* Right — Details */}
              <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">
                <div>
                  {book.category && (
                    <span className="inline-block text-xs font-semibold text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-0.5 mb-2">
                      {book.category}
                    </span>
                  )}
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                    {book.title}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      Bestseller
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-extrabold text-gray-900">
                    ₹{book.selling_price}
                  </span>
                  {book.market_price && (
                    <>
                      <span className="text-lg text-gray-400 line-through mb-0.5">
                        ₹{book.market_price}
                      </span>
                      {discount && (
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-0.5">
                          {discount}% off
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Key Features */}
                {book.keys?.length > 0 && (
                  <div>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Key Features
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {book.keys.map((key, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <BsFillPatchCheckFill className="text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{key}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Description */}
                {book.description && (
                  <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {book.description}
                  </p>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-600 mr-3">
                    Qty:
                  </span>
                  <button
                    onClick={decrease}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:border-gray-400 transition"
                  >
                    <FiMinus className="w-3.5 h-3.5 text-gray-700" />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={increase}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:border-gray-400 transition"
                  >
                    <FiPlus className="w-3.5 h-3.5 text-gray-700" />
                  </button>
                </div>

                {/* Buy buttons — desktop only */}
                <div className="hidden md:block">
                  <BuyButtons />
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 border-t border-gray-100">
                  {TRUST_BADGES.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 text-center"
                    >
                      <Icon className="text-gray-400 text-lg" />
                      <span className="text-[11px] text-gray-400 font-medium">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Sticky bottom bar — mobile only (hidden on md+) ───────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] px-4 py-3">
        <BuyButtons />
      </div>
    </>
  );
}
