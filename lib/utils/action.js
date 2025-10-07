"use server";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";

// Make it async
export async function getUserSession() {
  const cookieStore = await cookies();

  return {
    userId: cookieStore.get("user_id")?.value || null,
    token: cookieStore.get("token")?.value || null,
    name: cookieStore.get("name")?.value || null,
    email: cookieStore.get("email")?.value || null,
  };
}

export async function setUserSession({ userId, token, name, email }) {
  const cookieStore = await cookies();

  cookieStore.set("user_id", userId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("name", name, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  cookieStore.set("email", email, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
export async function clearUserSession() {
  const cookieStore = cookies();

  cookieStore.delete("user_id", { path: "/" });
  cookieStore.delete("token", { path: "/" });
  cookieStore.delete("name", { path: "/" });
  cookieStore.delete("email", { path: "/" });

  // Also sign out from NextAuth
}
