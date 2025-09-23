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

  return NextResponse.next();
}

// Apply middleware only on relevant routes
export const config = {
  matcher: [
    "/products/:path*",
    "/", // also apply on home
  ],
};
