"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../utils/spinner";
export default function ExploreAll() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleNavigate = () => {
    setLoading(true);
    router.push("/products");
  };
  return (
    <button
      disabled={loading}
      onClick={handleNavigate}
      className="bg-yellow-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition"
    >
      Explore All Books
      {loading && (
        <span className="inline-block align-middle ml-2">
          <Spinner />
        </span>
      )}
    </button>
  );
}
