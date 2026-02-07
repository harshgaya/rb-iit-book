"use client";

import Link from "next/link";

export default function IITFoundation() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold tracking-wider uppercase">
            Foundation Program
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 leading-tight">
            About IIT & NEET Foundation
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Our IIT & NEET Foundation books are specially designed for students
            of Class 6 to 10 to build strong concepts from an early stage. With
            exam-focused content, structured learning, and advanced
            problem-solving methods, students get a powerful foundation for
            future competitive exams like IIT-JEE and NEET.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {/* CARD 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition border border-blue-50">
            <div className="bg-blue-100 w-14 h-14 flex items-center justify-center rounded-xl mb-5">
              📘
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Design & Structure
            </h3>
            <p className="text-gray-600 mt-3">
              Scientifically designed syllabus with concept clarity,
              step-by-step explanations, and competitive exam level questions to
              strengthen fundamentals from early classes.
            </p>

            <Link href="/docs/book_structure.pdf">
              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                View Design & Advantages
              </button>
            </Link>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition border border-yellow-50">
            <div className="bg-yellow-100 w-14 h-14 flex items-center justify-center rounded-xl mb-5">
              📚
            </div>
            <h3 className="text-xl font-bold text-gray-900">Books & Prices</h3>
            <p className="text-gray-600 mt-3">
              Complete IIT & NEET foundation book sets for Class 6 to 10 with
              subject-wise premium content, practice sheets, and affordable
              pricing for schools and students.
            </p>

            <Link href="/docs/books.pdf">
              <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition">
                View Books & Prices
              </button>
            </Link>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition border border-green-50">
            <div className="bg-green-100 w-14 h-14 flex items-center justify-center rounded-xl mb-5">
              🛒
            </div>
            <h3 className="text-xl font-bold text-gray-900">How to Purchase</h3>
            <p className="text-gray-600 mt-3">
              Easy ordering process for schools, teachers, and parents. Contact
              us directly or order online to get premium foundation books
              delivered to your location quickly.
            </p>

            <Link href="/docs/how_to_purchase.pdf">
              <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
                How to Purchase
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
