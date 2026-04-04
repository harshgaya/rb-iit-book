"use client";

import Link from "next/link";
import ImageCarousel from "./image-carousal";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiTruck, FiAward, FiCheckCircle } from "react-icons/fi";
import { HiStar } from "react-icons/hi";
import { BsLightningChargeFill } from "react-icons/bs";
import SamplePDFModal from "./sample-pdf";

const STATS = [
  { value: "2M+", label: "Students trust us" },
  { value: "500+", label: "Schools enrolled" },
  { value: "Class 6–10", label: "All subjects" },
  { value: "98%", label: "Satisfaction rate" },
];

const TRUST_PILLS = [
  {
    icon: <FiTruck className="text-yellow-600" />,
    text: "Free delivery above ₹499",
  },
  {
    icon: <FiCheckCircle className="text-yellow-600" />,
    text: "Cash on delivery",
  },
  {
    icon: <FiAward className="text-yellow-600" />,
    text: "Expert-authored content",
  },
  {
    icon: <FiCheckCircle className="text-yellow-600" />,
    text: "School bulk discounts",
  },
];

export default function HeroNew() {
  const [visible, setVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay) =>
    `transition-all duration-700 ${delay} ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  return (
    <>
      {/* Offer strip */}

      <section className="relative w-full overflow-hidden bg-white">
        {/* Background blobs */}
        <div className="absolute -top-20 -right-24 w-96 h-96 rounded-full bg-yellow-100 opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-20 w-72 h-72 rounded-full bg-orange-100 opacity-40 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-14 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* ── LEFT ── */}
            <div className="flex flex-col">
              {/* Brand + rating */}
              <div
                className={`flex flex-wrap items-center gap-3 mb-5 ${fade("delay-[50ms]")}`}
              >
                <span className="text-xs font-bold tracking-widest text-yellow-600 uppercase">
                  Rajeswari Book Publishers
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
                <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-lg">
                  <HiStar className="text-amber-500 text-sm" />
                  4.9 · 2M+ students
                </span>
              </div>

              {/* H1 */}
              <h1
                className={`text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight ${fade("delay-[150ms]")}`}
              >
                IIT &amp; NEET Foundation <br />
                Books for{" "}
                <span className="relative inline-block text-yellow-500">
                  Class 6–10
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 180 8"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 6 C40 2, 100 1, 178 5"
                      stroke="#fbbf24"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subtext */}
              <p
                className={`mt-6 text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg ${fade("delay-[250ms]")}`}
              >
                Expert-curated books with concept clarity, exam-level questions,
                and structured learning — built to crack IIT-JEE &amp; NEET from
                the ground up.
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-wrap gap-3 mt-8 ${fade("delay-[350ms]")}`}
              >
                <Link href="/products">
                  <button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-yellow-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all duration-150">
                    Browse All Books →
                  </button>
                </Link>

                <button
                  onClick={() => setShowModal(true)}
                  className="bg-white text-gray-800 font-semibold text-base px-7 py-3.5 rounded-xl border border-gray-200 hover:border-yellow-400 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-150"
                >
                  Free Sample PDF
                </button>
              </div>

              {/* Trust pills */}
              <div
                className={`flex flex-wrap gap-2 mt-5 ${fade("delay-[400ms]")}`}
              >
                {TRUST_PILLS.map((p) => (
                  <span
                    key={p.text}
                    className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {p.icon}
                    {p.text}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div
                className={`grid grid-cols-4 gap-2 mt-10 pt-8 border-t border-gray-100 ${fade("delay-[500ms]")}`}
              >
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-extrabold text-gray-900 leading-none">
                      {s.value}
                    </div>
                    <div className="text-xs text-gray-400 font-medium mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className={`relative ${fade("delay-[600ms]")}`}>
              {/* Rotated bg card */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-3xl -rotate-2 scale-105 z-0" />

              {/* Carousel */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-white">
                <ImageCarousel />
              </div>

              {/* Floating: Olympiad */}
              <div className="absolute -bottom-4 -left-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                  <FiAward className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    Olympiad Gold
                  </div>
                  <div className="text-xs text-gray-400">
                    500+ winners used RP Books
                  </div>
                </div>
              </div>
              <SamplePDFModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
              />

              {/* Floating: Delivery */}
              <div className="absolute -top-4 -right-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <FiTruck className="text-green-500 text-xl" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    Free Delivery
                  </div>
                  <div className="text-xs text-gray-400">
                    Pan-India · Orders ₹1000+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
