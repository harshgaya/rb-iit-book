// middleware.js
import { NextResponse } from "next/server";

export async function middleware(req) {
  // const url = req.nextUrl.clone();
  // const token = req.cookies.get("token")?.value || null;
  // const userId = req.cookies.get("user_id")?.value || null;
  // const name = req.cookies.get("name")?.value || null;
  // const email = req.cookies.get("email")?.value || null;
  // console.log("Middleware - User Session:", { userId, token, name, email });
  // // Not logged in → go home
  // if (!token || !userId) {
  //   if (url.pathname !== "/") {
  //     url.pathname = "/sign-in";
  //     return NextResponse.redirect(url);
  //   }
  //   return NextResponse.next();
  // }
  // if (url.pathname.startsWith("/checkout")) {
  //   const fromCheckoutAllowed = req.cookies.get("fromCheckoutAllowed")?.value;
  //   if (!fromCheckoutAllowed) {
  //     return NextResponse.redirect(new URL("/cart", req.url));
  //   }
  //   const res = NextResponse.next();
  //   res.cookies.delete("fromCheckoutAllowed");
  //   return res;
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/address/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
  ],
};
