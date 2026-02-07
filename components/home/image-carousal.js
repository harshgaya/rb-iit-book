"use client";
import { useEffect, useState } from "react";

export default function ImageCarousel() {
  const images = ["/carousals/cr1.jpeg", "/carousals/cr2.jpeg"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(slider);
  }, []);

  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-3xl shadow-2xl">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="books"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
