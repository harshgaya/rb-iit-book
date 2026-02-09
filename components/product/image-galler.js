"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageGallery({ images = [], title = "" }) {
  const [active, setActive] = useState(images?.[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="w-full">
      <div className="flex justify-center lg:hidden">
        <div className="w-full max-w-lg">
          <div
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            onScroll={(e) => {
              const index = Math.round(
                e.currentTarget.scrollLeft / e.currentTarget.clientWidth,
              );
              setActiveIndex(index);
              setActive(images[index]);
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="min-w-full snap-center rounded-2xl bg-white p-6"
              >
                <Image
                  src={img}
                  alt={`${title} ${index + 1}`}
                  width={350}
                  height={520}
                  className="mx-auto object-contain"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-center gap-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-5 bg-gray-900" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:flex gap-4 mt-4">
        <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1">
          {images.map((img, index) => (
            <button
              key={index}
              onMouseEnter={() => {
                setActive(img);
                setActiveIndex(index);
              }}
              onClick={() => {
                setActive(img);
                setActiveIndex(index);
              }}
              className={`h-20 w-16 rounded-lg border bg-white p-1 transition ${
                active === img ? "border-secondary" : "border-gray-200"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumb ${index + 1}`}
                width={60}
                height={80}
                className="h-full w-full object-contain"
                unoptimized
              />
            </button>
          ))}
        </div>

        <div className="flex-1 rounded-2xl bg-white p-8 flex items-center justify-center min-h-[520px]">
          <Image
            src={active}
            alt={title}
            width={380}
            height={520}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
