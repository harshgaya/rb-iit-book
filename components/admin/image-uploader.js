"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { adminUploadFile } from "@/lib/api/api";

// Single cover image uploader. Shows a preview, uploads directly to S3
// via a presigned URL, and reports the final CDN url back to the parent.
export function SingleImageUploader({ value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await adminUploadFile(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="cover" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 shrink-0">
            <UploadCloud className="w-6 h-6" />
          </div>
        )}

        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 text-sm font-medium border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition disabled:opacity-60"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
          </button>
          <p className="text-xs text-gray-400 mt-1">Or paste an image URL below.</p>
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
      />
    </div>
  );
}

// Multi-image uploader for the gallery. Keeps a list of URLs; uploading
// appends a new one, each entry can be removed individually.
export function MultiImageUploader({ values, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await adminUploadFile(file);
      onChange([...(values || []), url]);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeAt(i) {
    onChange(values.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        {(values || []).map((url, i) => (
          <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`gallery-${i}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition disabled:opacity-60"
        >
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
