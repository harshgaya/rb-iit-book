"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminCreateBook, adminUpdateBook } from "@/lib/api/api";
import { SingleImageUploader, MultiImageUploader } from "./image-uploader";

const CLASSES = [
  "class-6",
  "class-7",
  "class-8",
  "class-9",
  "class-10",
  "class-11",
  "class-12",
];
const SUBJECTS = ["", "physics", "chemistry", "maths", "biology"];
const CATEGORIES = ["", "foundation", "iit", "olympiad"];

function toKeysText(keys) {
  return (keys || []).join("\n");
}

export default function BookForm({ book, onSaved, onCancel }) {
  const router = useRouter();
  const isEdit = Boolean(book?._id);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: book?.title || "",
    description: book?.description || "",
    class: book?.class || "class-10",
    subject: book?.subject || "",
    category: book?.category || "",
    market_price: book?.market_price ?? "",
    selling_price: book?.selling_price ?? "",
    stock_quantity: book?.stock_quantity ?? 0,
    in_stock: book?.in_stock ?? true,
    is_active: book?.is_active ?? true,
    cover_image: book?.cover_image || "",
    gallery_images: book?.gallery_images || [],
    keys: toKeysText(book?.keys),
    amazon_url: book?.amazon_url || "",
    flipkart_url: book?.flipkart_url || "",
  });

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      class: form.class,
      subject: form.subject || undefined,
      category: form.category || undefined,
      market_price:
        form.market_price === "" ? undefined : Number(form.market_price),
      selling_price:
        form.selling_price === "" ? undefined : Number(form.selling_price),
      stock_quantity: Number(form.stock_quantity) || 0,
      in_stock: form.in_stock,
      is_active: form.is_active,
      cover_image: form.cover_image,
      gallery_images: (form.gallery_images || []).filter(Boolean),
      keys: form.keys
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      amazon_url: form.amazon_url,
      flipkart_url: form.flipkart_url,
    };

    try {
      if (isEdit) {
        await adminUpdateBook(book._id, payload);
      } else {
        await adminCreateBook(payload);
      }
      if (onSaved) {
        onSaved();
      } else {
        router.push("/admin/books");
      }
    } catch (err) {
      setError(err.message || "Failed to save book");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class
          </label>
          <select
            value={form.class}
            onChange={(e) => set("class", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
          >
            {CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s || "— none —"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c || "— none —"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-gray-400 -mt-3">
        Subject + Category power the IIT / Olympiad nav filters on the site -
        set them so the book shows up under the right menu.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Market Price (₹)
          </label>
          <input
            type="number"
            value={form.market_price}
            onChange={(e) => set("market_price", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selling Price (₹) *
          </label>
          <input
            required
            type="number"
            value={form.selling_price}
            onChange={(e) => set("selling_price", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            value={form.stock_quantity}
            onChange={(e) => set("stock_quantity", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.in_stock}
            onChange={(e) => set("in_stock", e.target.checked)}
          />
          In stock
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => set("is_active", e.target.checked)}
          />
          Active (visible on site)
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image
        </label>
        <SingleImageUploader
          value={form.cover_image}
          onChange={(url) => set("cover_image", url)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gallery Images
        </label>
        <MultiImageUploader
          values={form.gallery_images}
          onChange={(imgs) => set("gallery_images", imgs)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Key Features (one per line)
        </label>
        <textarea
          rows={4}
          value={form.keys}
          onChange={(e) => set("keys", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amazon URL
          </label>
          <input
            value={form.amazon_url}
            onChange={(e) => set("amazon_url", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Flipkart URL
          </label>
          <input
            value={form.flipkart_url}
            onChange={(e) => set("flipkart_url", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Book"}
        </button>
        <button
          type="button"
          onClick={() => (onCancel ? onCancel() : router.push("/admin/books"))}
          className="border border-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
