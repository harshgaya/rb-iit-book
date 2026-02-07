"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const dropdownItems = {
    Foundation: [
      { name: "Class 6", href: "/products/class-6" },
      { name: "Class 7", href: "/products/class-7" },
      { name: "Class 8", href: "/products/class-8" },
      { name: "Class 9", href: "/products/class-9" },
      { name: "Class 10", href: "/products/class-10" },
    ],
    IIT: [
      { name: "Physics", href: "/products?search=physics" },
      { name: "Chemistry", href: "/products?search=chemistry" },
      { name: "Maths", href: "/products?search=math" },
    ],
    Olympiad: [
      { name: "Physics", href: "/products?search=olympiad" },
      { name: "Chemistry", href: "/products?search=olympiad" },
      { name: "Maths", href: "/products?search=olympiad" },
    ],
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.push(`/products?search=${searchText}`);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpeg" alt="logo" width={55} height={55} />
          </Link>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center w-[420px]"
          >
            <input
              type="text"
              placeholder="Search books..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 rounded-l-lg text-black focus:outline-none"
            />
            <button className="bg-yellow-400 px-5 py-2 rounded-r-lg text-black font-semibold">
              Search
            </button>
          </form>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {Object.keys(dropdownItems).map((menu) => (
                <div
                  key={menu}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(menu)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="hover:text-yellow-400 font-medium">
                    {menu}
                  </button>

                  {activeDropdown === menu && (
                    <div className="absolute left-0 top-full bg-gray-800 rounded shadow-lg min-w-[160px] z-50">
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
              <Link href="/contact" className="hover:text-yellow-400">
                Contact Us
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <input
            type="text"
            placeholder="Search books class 6-10..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black focus:outline-none"
          />
        </form>
      </div>

      <div
        className={`md:hidden bg-gray-800 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[400px] py-4" : "max-h-0"
        }`}
      >
        <div className="px-4 space-y-2">
          <p className="text-yellow-400 font-semibold">Foundation</p>

          {dropdownItems.Foundation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              {item.name}
            </Link>
          ))}

          <hr className="border-gray-700 my-3" />

          <Link
            href="/about-us"
            onClick={() => setMenuOpen(false)}
            className="block py-2 px-3 hover:bg-gray-700 rounded"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block py-2 px-3 hover:bg-gray-700 rounded"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
