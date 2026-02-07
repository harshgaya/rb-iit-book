"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full  bg-gradient-to-br from-yellow-50 to-white py-0">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-yellow-500 font-semibold tracking-wide">
              RAJESWARI BOOK PUBLISHERS
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mt-3">
              Premium School Books <br />
              <span className="text-yellow-500">Class 6 to 10</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              We provide high-quality premium books for students from Class 6 to
              Class 10. Our books are designed to strengthen concepts, improve
              exam performance, and help students achieve academic excellence
              with clear explanations and practice materials.
            </p>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Trusted by schools, teachers, and thousands of students, our books
              combine strong fundamentals, modern learning methods, and
              exam-focused preparation to ensure better results.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/products">
                <button className="bg-yellow-400 text-white px-7 py-3 rounded-xl font-semibold shadow-lg transition">
                  View Books
                </button>
              </Link>

              {/* <button className="border border-gray-300 hover:border-orange-600 hover:text-orange-600 px-7 py-3 rounded-xl font-semibold transition">
                Contact Us
              </button> */}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Class 6–10</h3>
                <p className="text-gray-500 text-sm">All Subjects Covered</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Premium</h3>
                <p className="text-gray-500 text-sm">Quality Content</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">Trusted</h3>
                <p className="text-gray-500 text-sm">By Schools & Students</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src="/home/hero.jpg"
              alt="School Books"
              className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
