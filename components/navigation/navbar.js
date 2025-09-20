"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownItems = {
    Olympiad: [
      { name: "Physics", href: "/olympiad/physics" },
      { name: "Chemistry", href: "/olympiad/chemistry" },
      { name: "Maths", href: "/olympiad/maths" },
    ],
    IIT: [
      { name: "Physics", href: "/iit/physics" },
      { name: "Chemistry", href: "/iit/chemistry" },
      { name: "Maths", href: "/iit/maths" },
    ],
    NEET: [
      { name: "Biology", href: "/neet/biology" },
      { name: "Chemistry", href: "/neet/chemistry" },
      { name: "Physics", href: "/neet/physics" },
    ],
  };

  const cartCount = 0;

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold hover:text-yellow-400"
          >
            <BookOpen className="w-6 h-6 text-yellow-400" />
            RB Book
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {Object.keys(dropdownItems).map((menu) => (
              <div
                key={menu}
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="hover:text-yellow-400">{menu}</button>

                {/* Dropdown Menu */}
                {activeDropdown === menu && (
                  <div
                    className="absolute left-0 top-full bg-gray-800 rounded shadow-lg min-w-[150px] z-50"
                    // Keep dropdown active when mouse is over the dropdown itself
                    onMouseEnter={() => setActiveDropdown(menu)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {dropdownItems[menu].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 relative">
            <Link href="/cart" className="relative hover:text-yellow-400">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            <Link href="/profile" className="hover:text-yellow-400">
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-gray-800 rounded shadow-lg">
            {Object.keys(dropdownItems).map((menu) => (
              <div key={menu} className="border-b border-gray-700">
                <p className="px-4 py-2 font-semibold">{menu}</p>
                {dropdownItems[menu].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-2 hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
