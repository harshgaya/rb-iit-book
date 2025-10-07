"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDER_IMAGES } from "@/lib/utils/constants";

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? SLIDER_IMAGES.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === SLIDER_IMAGES.length - 1 ? 0 : prev + 1
    );
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!SLIDER_IMAGES || SLIDER_IMAGES.length === 0) return null;

  return (
    <div className="relative w-full h-[40vh] sm:h-[60vh] lg:h-[70vh] mx-auto overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {SLIDER_IMAGES.map((img, index) => (
          <div key={index} className="relative w-full h-full flex-shrink-0">
            <Image
              src={img}
              alt={`Slide ${index}`}
              fill
              priority={index === 0}
              className="object-cover" // fills nicely, no stretch
            />
          </div>
        ))}
      </div>

      {/* Left/Right buttons */}
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
        {SLIDER_IMAGES.map((_, index) => (
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
