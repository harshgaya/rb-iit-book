"use client";

import Image from "next/image";
import { BookOpen, PhoneCall, Paintbrush } from "lucide-react";
import ModalHeadlessUi from "../modal/headless-ui-modal";
import { useState } from "react";
import ContactForm from "../modal/contact-form";

export default function BulkOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleBulkOrderClick() {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-yellow-50 to-white py-16 px-6 sm:px-12 lg:px-20 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Section - Text */}
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-snug mb-6">
            <span className="text-yellow-500">Your Brand,</span>
            <br /> Our Books — Perfect Partnership!
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            Looking for high-quality academic books for your School, Institute,
            or Academy? We’ve got you covered — whether you want books under our
            brand or your very own.
          </p>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-start gap-2">
              <BookOpen className="text-yellow-500 w-5 h-5 mt-1" />
              <span>
                <strong>Our Books, Our Brand:</strong> Choose from our trusted
                academic collection.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Paintbrush className="text-yellow-500 w-5 h-5 mt-1" />
              <span>
                <strong>Our Books, Your Brand:</strong> Go white-label — same
                content, your logo, your design.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <PhoneCall className="text-yellow-500 w-5 h-5 mt-1" />
              <span>
                <strong>Fast Delivery & Custom Covers</strong> for Schools,
                Academies & Institutes.
              </span>
            </li>
          </ul>

          <button
            onClick={handleBulkOrderClick}
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            Contact Us Today
          </button>
        </div>

        {/* Right Section - Optimized Image */}
        <div className="flex justify-center md:justify-end relative w-full h-[300px] sm:h-[400px] lg:h-[450px]">
          <Image
            src="/home/white-label.png"
            alt="White Label Books"
            fill
            priority
            className="object-contain drop-shadow-lg animate-fadeInUp"
          />
        </div>
      </div>
      <ModalHeadlessUi isOpen={isModalOpen} onClose={handleCloseModal}>
        <ContactForm onClose={handleCloseModal} />
      </ModalHeadlessUi>
    </section>
  );
}
