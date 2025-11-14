"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getBanner } from "@/lib/api/api";

export default function ImageSlider() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const res = await getBanner();
        console.log("✅ Banners fetched:", res);

        if (Array.isArray(res) && res.length > 0) {
          setBanners(res);
        } else {
          setBanners([]);
        }
      } catch (err) {
        console.error("❌ Error fetching banners:", err);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // 🔹 Auto slide every 5 seconds
  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  // 🔹 Navigation
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="relative w-full h-[40vh] sm:h-[60vh] lg:h-[70vh] mx-auto bg-gray-200 animate-pulse rounded-xl" />
    );
  }

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full h-[40vh] sm:h-[60vh] lg:h-[70vh] mx-auto overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-full flex-shrink-0 bg-white"
          >
            <Image
              src={img.image}
              alt={`Slide ${index}`}
              fill // ✅ makes the image fill the container properly
              priority={index === 0}
              className="object-contain" // ✅ keeps original proportions, no stretching
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-yellow-400" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
