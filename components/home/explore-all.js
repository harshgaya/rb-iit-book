"use client";
import { useRouter } from "next/navigation";
export default function ExploreAll() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/products")}
      className="bg-yellow-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition"
    >
      Explore All Books
    </button>
  );
}
