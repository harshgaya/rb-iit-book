"use client";
import { useState } from "react";

export default function ContactForm({ onClose }) {
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  async function onSubmit(e) {
    e.preventDefault();

    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    // Honeypot check (spam protection)
    if (form.get("company")?.toString().trim()) return;

    const payload = {
      name: form.get("name")?.toString().trim(),
      email: form.get("email")?.toString().trim(),
      phone: form.get("phone")?.toString().trim(),
      subject: form.get("subject")?.toString().trim(),
      message: form.get("message")?.toString().trim(),
      type: "bulk-order",
    };

    // ✅ Validation
    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.subject ||
      !payload.message
    ) {
      setStatus({
        loading: false,
        ok: false,
        msg: "Please fill all required fields, including phone number.",
      });
      return;
    }

    try {
      setStatus({ loading: true, ok: null, msg: "" });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.ok === false)
        throw new Error(data.error || "Request failed");

      // ✅ Reset form safely
      formEl.reset();

      setStatus({
        loading: false,
        ok: true,
        msg: "✅ Thanks! We’ll get back to you soon.",
      });

      // ✅ Auto close modal after 2 seconds
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      setStatus({
        loading: false,
        ok: false,
        msg: "❌ Something went wrong. Please try again.",
      });
    }
  }

  return (
    <section className="w-full bg-white rounded-xl p-6 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
          Contact Us
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Tell us a little about your requirements and we’ll reach out shortly.
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-5">
          {/* Honeypot (hidden field) */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          {/* Name + Email */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-gray-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Phone + Subject */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                required
                onWheel={(e) => e.target.blur()}
                inputMode="numeric"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-gray-400"
                placeholder="9876543210"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-gray-400"
                placeholder="How can we help?"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-gray-400"
              placeholder="Share details about your query or project..."
            />
          </div>

          {/* Info */}
          <span className="text-sm text-gray-500">
            We typically reply within 24 hours.
          </span>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-full border border-gray-300 bg-white px-6 py-2.5 text-gray-700 font-medium shadow-sm hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={status.loading}
              className="inline-flex justify-center rounded-full bg-yellow-500 px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>
          </div>

          {/* Feedback Message */}
          {status.msg && (
            <p
              className={`text-sm mt-3 text-center ${
                status.ok ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
