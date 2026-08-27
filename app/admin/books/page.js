"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/admin-guard";
import AdminShell from "@/components/admin/admin-shell";
import Drawer from "@/components/admin/drawer";
import BookForm from "@/components/admin/book-form";
import { adminGetBooks, adminDeleteBook } from "@/lib/api/api";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

function BooksContent() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Drawer state: null = closed, "new" = add book, or the book object being edited
  const [drawerBook, setDrawerBook] = useState(null);
  const [drawerMode, setDrawerMode] = useState(null); // "new" | "edit" | null

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminGetBooks({ page, limit: 20, search });
      setBooks(data.items || []);
      setPages(data.pages || 1);
    } catch (e) {
      setError(e.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function openNew() {
    setDrawerBook(null);
    setDrawerMode("new");
  }
  function openEdit(book) {
    setDrawerBook(book);
    setDrawerMode("edit");
  }
  function closeDrawer() {
    setDrawerMode(null);
    setDrawerBook(null);
  }
  function onSaved() {
    closeDrawer();
    load();
  }

  async function onDelete(id, title) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    try {
      await adminDeleteBook(id);
      load();
    } catch (e) {
      alert(e.message || "Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 justify-between mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            load();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm w-full sm:w-64 outline-none focus:border-gray-500"
            />
          </div>
          <button className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-black transition shrink-0">
            Search
          </button>
        </form>

        <button
          onClick={openNew}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Book
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Class</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Active</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">Loading...</td></tr>
            ) : books.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">No books found</td></tr>
            ) : (
              books.map((book) => (
                <tr key={book._id} className="border-t border-gray-100">
                  <td className="px-5 py-3 text-gray-800 max-w-xs truncate">{book.title}</td>
                  <td className="px-5 py-3 text-gray-500">{book.class}</td>
                  <td className="px-5 py-3 text-gray-800">₹{book.selling_price}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${book.in_stock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                      {book.in_stock ? "In stock" : "Out of stock"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{book.is_active === false ? "No" : "Yes"}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(book)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(book._id, book.title)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          <p className="text-center text-gray-400 py-8">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No books found</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{book.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{book.class} · ₹{book.selling_price}</p>
                  <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${book.in_stock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                    {book.in_stock ? "In stock" : "Out of stock"}
                  </span>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(book)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(book._id, book.title)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium ${
                p === page ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <Drawer
        open={drawerMode !== null}
        onClose={closeDrawer}
        title={drawerMode === "edit" ? "Edit Book" : "Add Book"}
      >
        {drawerMode !== null && (
          <BookForm book={drawerMode === "edit" ? drawerBook : null} onSaved={onSaved} onCancel={closeDrawer} />
        )}
      </Drawer>
    </div>
  );
}

export default function AdminBooksPage() {
  return (
    <AdminGuard>
      <AdminShell title="Books">
        <BooksContent />
      </AdminShell>
    </AdminGuard>
  );
}
