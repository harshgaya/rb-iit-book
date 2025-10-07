"use client";

import { useCart } from "@/context/cart-context";
import { clearUserSession } from "@/lib/utils/action";
import { Popover } from "@headlessui/react";
import { User, ShoppingBag, LogOut, LucideLocationEdit } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PopOverProfile() {
  const router = useRouter();
  const cart = useCart();

  function logout(close) {
    clearUserSession();
    close();

    cart.setCartToEmpty();
    signOut({ redirect: false });
    router.push("/");
  }

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          {/* Trigger button */}
          <Popover.Button className="flex items-center gap-1 hover:text-yellow-400 focus:outline-none">
            <User className="w-5 h-5" />
          </Popover.Button>

          {/* Dropdown panel */}
          <Popover.Panel
            anchor="bottom"
            className="absolute mt-3 w-44 bg-white shadow-lg rounded-lg flex flex-col py-2 z-50 text-black"
          >
            <Link
              href="/profile"
              onClick={() => close()} // 👈 closes popover when clicked
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
            >
              <User className="w-4 h-4" />
              My Profile
            </Link>
            <Link
              href="/address"
              onClick={() => close()} // 👈 closes popover when clicked
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
            >
              <LucideLocationEdit className="w-4 h-4" />
              My Address
            </Link>

            <Link
              href="/orders"
              onClick={() => close()} // 👈 closes popover when clicked
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
            >
              <ShoppingBag className="w-4 h-4" />
              Orders
            </Link>

            <button
              onClick={() => logout(close)}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
