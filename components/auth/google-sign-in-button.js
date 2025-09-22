"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  async function handleGoogleSignIn() {
    try {
      console.log("Signing in...");
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-100 transition"
    >
      <Image src="/home/google-logo.webp" alt="Google" width={20} height={20} />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
}
