"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // <-- useRouter for client-side navigation
import { BookOpen, ShoppingCart, User } from "lucide-react";
import PopOverProfile from "./pop-over-profile";
import CartDrawer from "./cart-drawer";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchText, setSearchText] = useState(""); // <-- search input state
  const router = useRouter();

  const dropdownItems = {
    Olympiad: [
      { name: "Physics", href: "/products?search=olympiad" },
      { name: "Chemistry", href: "/products?search=olympiad" },
      { name: "Maths", href: "/products?search=olympiad" },
    ],
    IIT: [
      { name: "Physics", href: "/products?search=iit" },
      { name: "Chemistry", href: "/products?search=iit" },
      { name: "Maths", href: "/products?search=iit" },
    ],
    NEET: [
      { name: "Biology", href: "/products?search=neet" },
      { name: "Chemistry", href: "/products?search=neet" },
      { name: "Physics", href: "/products?search=neet" },
    ],
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== "") {
      router.push(`/products?search=${encodeURIComponent(searchText)}`);
    }
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

          {/* Search Input */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-3 py-1 rounded-l-md text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellowColor text-black px-4 py-1 rounded-r-md hover:bg-yellow-500 transition"
            >
              Search
            </button>
          </form>

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
            <Link href="/about-us" className="hover:text-yellow-400">
              About Us
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 relative">
            <CartDrawer />
            <Link
              href="/cart"
              className="relative hover:text-yellow-400"
            ></Link>
            <PopOverProfile />

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
            <Link href="/about-us" className="hover:text-yellow-400">
              About Us
            </Link>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full  px-3 py-1 rounded-l-md text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 text-black w-full bg-yellowColor  py-1 rounded hover:bg-yellow-500 transition"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
