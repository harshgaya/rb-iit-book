"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, LogOut, Menu } from "lucide-react";
import { adminLogout, adminGetUnseenLeadsCount } from "@/lib/api/api";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/books", label: "Books", icon: BookOpen },
  { href: "/admin/leads", label: "Leads", icon: Users },
];

function SidebarContent({ pathname, onLogout, onNavigate, unseenCount }) {
  return (
    <>
      <div className="px-5 py-5 border-b border-gray-800 flex items-center justify-between">
        <span className="font-bold text-lg text-white">RB Admin</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/admin" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-yellow-500 text-gray-900"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                {label}
              </span>
              {label === "Leads" && unseenCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {unseenCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-300 hover:bg-gray-800 border-t border-gray-800"
      >
        <LogOut className="w-4 h-4" /> Log out
      </button>
    </>
  );
}

export default function AdminShell({ children, title }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);

  useEffect(() => {
    adminGetUnseenLeadsCount()
      .then(setUnseenCount)
      .catch(() => {});
  }, [pathname]);

  function handleLogout() {
    adminLogout();
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="hidden md:flex w-60 bg-gray-900 flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        <SidebarContent
          pathname={pathname}
          onLogout={handleLogout}
          unseenCount={unseenCount}
        />
      </aside>

      <div
        className={`fixed inset-0 z-50 md:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-gray-900 flex flex-col transform transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent
            pathname={pathname}
            onLogout={handleLogout}
            onNavigate={() => setMobileOpen(false)}
            unseenCount={unseenCount}
          />
        </aside>
      </div>

      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            {title}
          </h1>
        </header>
        <div className="p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
