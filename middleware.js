// middleware.js
import { NextResponse } from "next/server";

// No auth-gated customer routes remain (cart/checkout/orders/address/profile
// were removed - the site no longer has user accounts, only a WhatsApp /
// Amazon / Flipkart buy flow from the product page). This is a no-op today;
// kept so admin-route protection can be added here later if needed.
export async function middleware(req) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
