"use client";

import { usePathname } from "next/navigation";

// Hides the public navbar/top-header/footer on every /admin route,
// since the admin dashboard has its own layout and shouldn't show
// customer-facing navigation.
export default function SiteChrome({ topHeader, navbar, footer, children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {topHeader}
      {navbar}
      {children}
      {footer}
    </>
  );
}
