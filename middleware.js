// middleware.js
import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();

  const token = req.cookies.get("token")?.value || null;
  const userId = req.cookies.get("user_id")?.value || null;
  const name = req.cookies.get("name")?.value || null;
  const email = req.cookies.get("email")?.value || null;

  console.log("Middleware triggered");
  console.log({ token, userId, name, email, pathname: url.pathname });

  // Not logged in → go home
  if (!token || !userId) {
    if (url.pathname !== "/") {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ✅ Checkout route protection (must be inside middleware)
  if (url.pathname.startsWith("/checkout")) {
    const fromCheckoutAllowed = req.cookies.get("fromCheckoutAllowed")?.value;

    if (!fromCheckoutAllowed) {
      // Redirect to /cart
      return NextResponse.redirect(new URL("/cart", req.url));
    }

    // Remove flag so it can't be reused
    const res = NextResponse.next();
    res.cookies.delete("fromCheckoutAllowed");
    return res;
  }

  return NextResponse.next();
}

// ✅ Combine matchers properly
export const config = {
  matcher: ["/cart/:path*", "/address/:path*", "/checkout/:path*"],
};
