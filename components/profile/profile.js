"use client";

import { ShoppingCart, Package, MapPin, LogOut } from "lucide-react";
import Link from "next/link";

export default function UserProfilePage() {
  const userName = "Harsh";

  const options = [
    {
      id: 1,
      name: "My Orders",
      icon: <Package className="w-6 h-6 text-blue-500" />,
      href: "/orders",
    },
    {
      id: 2,
      name: "Cart",
      icon: <ShoppingCart className="w-6 h-6 text-yellow-500" />,
      href: "/cart",
    },
    {
      id: 3,
      name: "Addresses",
      icon: <MapPin className="w-6 h-6 text-green-500" />,
      href: "/addresses",
    },
    {
      id: 4,
      name: "Logout",
      icon: <LogOut className="w-6 h-6 text-red-500" />,
      href: "/logout",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      {/* Greeting */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Hello, {userName}</h1>
        <p className="text-gray-600 mt-2">Manage your account and orders</p>
      </div>

      {/* Profile Options */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {options.map((option) => (
          <Link
            key={option.id}
            href={option.href}
            className="flex flex-col items-center justify-center bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
          >
            <div className="mb-3">{option.icon}</div>
            <span className="text-gray-800 font-medium">{option.name}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
