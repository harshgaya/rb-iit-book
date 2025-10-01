"use client";

import { clearUserSession } from "@/lib/utils/action";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { User, ShoppingBag, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PopOverProfile() {
  const router = useRouter();
  function logout() {
    clearUserSession();
    router.push("/");
  }
  return (
    <Popover className="relative">
      {/* Trigger button */}
      <PopoverButton className="flex items-center gap-1 hover:text-yellow-400 focus:outline-none">
        <User className="w-5 h-5" />
      </PopoverButton>

      {/* Dropdown panel */}
      <PopoverPanel
        anchor="bottom"
        className="absolute mt-3 w-44 bg-white shadow-lg rounded-lg flex flex-col py-2 z-50 text-black"
      >
        <Link
          href="/profile"
          className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
        >
          <User className="w-4 h-4" />
          My Profile
        </Link>
        <Link
          href="/orders"
          className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
        >
          <ShoppingBag className="w-4 h-4" />
          Orders
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded text-red-600"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </PopoverPanel>
    </Popover>
  );
}
