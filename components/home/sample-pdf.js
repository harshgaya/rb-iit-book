"use client";

import Link from "next/link";
import { FiDownload, FiX, FiBookOpen } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import ModalHeadlessUi from "../modal/headless-ui-modal";

const CLASS_PDFS = [
  {
    class: "Conquering Mathematics",
    badge: "CM",
    subjects: ["Mathematics"],
    pdf: "/sample-pdfs/conquering-maths.pdf",
    color: "bg-blue-50 border-blue-200",
    badgeStyle: "bg-blue-100 text-blue-700",
    popular: true,
  },
  {
    class: "Mathematics Marvels",
    badge: "MM",
    subjects: ["Mathematics"],
    pdf: "/sample-pdfs/maths-marvel.pdf",
    color: "bg-blue-50 border-blue-200",
    badgeStyle: "bg-blue-100 text-blue-700",
    popular: true,
  },
  {
    class: "Class 6 Mathematics",
    badge: "6M",
    subjects: ["Mathematics", "Science"],
    pdf: "/sample-pdfs/6-maths.pdf",
    color: "bg-blue-50 border-blue-200",
    badgeStyle: "bg-blue-100 text-blue-700",
  },
  {
    class: "Class 6 Science",
    badge: "6S",
    subjects: ["Mathematics", "Science"],
    pdf: "/sample-pdfs/6-science.pdf",
    color: "bg-blue-50 border-blue-200",
    badgeStyle: "bg-blue-100 text-blue-700",
  },
  {
    class: "Class 7 Mathematics",
    badge: "7M",
    subjects: ["Mathematics", "Science"],
    pdf: "/sample-pdfs/class-7-maths.pdf",
    color: "bg-purple-50 border-purple-200",
    badgeStyle: "bg-purple-100 text-purple-700",
  },
  {
    class: "Class 7 Science",
    badge: "7S",
    subjects: ["Mathematics", "Science"],
    pdf: "/sample-pdfs/class-7-science.pdf",
    color: "bg-purple-50 border-purple-200",
    badgeStyle: "bg-purple-100 text-purple-700",
  },
  {
    class: "Class 8 Mathematics",
    badge: "8M",
    subjects: ["Mathematics", "Science"],
    pdf: "/sample-pdfs/class-8-maths.pdf",
    color: "bg-green-50 border-green-200",
    badgeStyle: "bg-green-100 text-green-700",
  },
  {
    class: "Class 8 Science",
    badge: "8S",
    subjects: ["Mathematics", "Science"],
    pdf: "/sample-pdfs/class-8-science.pdf",
    color: "bg-green-50 border-green-200",
    badgeStyle: "bg-green-100 text-green-700",
  },
  {
    class: "Class 9 Mathematics",
    badge: "9M",
    subjects: ["Physics & Chemistry", "Mathematics", "Biology"],
    pdf: "/sample-pdfs/class-9-maths.pdf",
    color: "bg-orange-50 border-orange-200",
    badgeStyle: "bg-orange-100 text-orange-700",
  },
  {
    class: "Class 9 Science",
    badge: "9S",
    subjects: ["Physics & Chemistry", "Mathematics", "Biology"],
    pdf: "/sample-pdfs/class-9-science.pdf",
    color: "bg-orange-50 border-orange-200",
    badgeStyle: "bg-orange-100 text-orange-700",
  },
  {
    class: "Class 10 Mathematics",
    badge: "10M",
    subjects: ["Physics & Chemistry", "Mathematics", "Biology"],
    pdf: "/sample-pdfs/class-10-maths.pdf",
    color: "bg-red-50 border-red-200",
    badgeStyle: "bg-red-100 text-red-700",
  },
  {
    class: "Class 10 Science",
    badge: "10S",
    subjects: ["Physics & Chemistry", "Mathematics", "Biology"],
    pdf: "/sample-pdfs/class-10-physics.pdf",
    color: "bg-red-50 border-red-200",
    badgeStyle: "bg-red-100 text-red-700",
  },
];

export default function SamplePDFModal({ isOpen, onClose }) {
  return (
    <ModalHeadlessUi isOpen={isOpen} onClose={onClose}>
      {/* ── Header (never scrolls) ── */}
      <div className="flex items-start justify-between mb-4 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HiOutlineAcademicCap className="text-yellow-500 text-xl" />
            <h2 className="text-lg font-bold text-gray-900">
              Free Sample PDFs
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            Pick your class and preview before buying.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors flex-shrink-0 ml-4"
        >
          <FiX className="text-lg" />
        </button>
      </div>

      {/*
        ── Scrollable list ──
        flex-1    → takes all space between header and footer
        min-h-0   → CRITICAL: without this, flex children ignore parent max-h
        overflow-y-auto → actually scrolls
      */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-3 pr-1 pb-1">
          {CLASS_PDFS.map((item) => (
            <div
              key={item.class}
              className={`relative flex items-center gap-3 border rounded-xl px-4 py-3 ${item.color}`}
            >
              {item.popular && (
                <span className="absolute -top-2.5 left-4 bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">
                  🔥 Most Popular
                </span>
              )}

              {/* Badge */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 ${item.badgeStyle}`}
              >
                {item.badge}
              </div>

              {/* Text — min-w-0 allows truncate to work */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 truncate">
                  {item.class}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 truncate">
                  {item.subjects.join(" · ")}
                </div>
              </div>

              {/* CTA */}
              <a
                href={item.pdf}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-yellow-400 hover:text-yellow-600 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-150 flex-shrink-0"
              >
                <FiDownload className="text-sm" />
                View PDF
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer (never scrolls) ── */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center flex-shrink-0">
        <p className="text-xs text-gray-400 mb-3">
          Like what you see? Get the full book at the best price.
        </p>
        <Link
          href="/products"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm py-3 rounded-xl transition-all duration-150"
        >
          <FiBookOpen />
          Browse &amp; Buy All Books →
        </Link>
      </div>
    </ModalHeadlessUi>
  );
}
