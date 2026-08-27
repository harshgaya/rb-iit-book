"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/api/api";

// Wrap any admin page's content in this. Redirects to /admin/login if
// there's no admin token in localStorage.
export default function AdminGuard({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Checking session...
      </div>
    );
  }

  return children;
}
