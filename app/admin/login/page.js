"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin, isAdminLoggedIn } from "@/lib/api/api";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(form);
      if (isAdminLoggedIn()) {
        router.replace("/admin");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-yellow-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gray-900 text-white font-semibold py-2.5 rounded-lg hover:bg-black transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
