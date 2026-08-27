"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGuard from "@/components/admin/admin-guard";
import AdminShell from "@/components/admin/admin-shell";
import { adminGetAnalytics } from "@/lib/api/api";
import { BookOpen, CheckCircle, XCircle, Users, TrendingUp } from "lucide-react";

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tone}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function DashboardContent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminGetAnalytics()
      .then(setData)
      .catch((e) => setError(e.message || "Failed to load analytics"));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={BookOpen} label="Total Books" value={data.totalBooks} tone="bg-blue-50 text-blue-600" />
        <StatCard icon={CheckCircle} label="In Stock" value={data.inStock} tone="bg-green-50 text-green-600" />
        <StatCard icon={XCircle} label="Out of Stock" value={data.outOfStock} tone="bg-red-50 text-red-600" />
        <StatCard icon={Users} label="Total Leads" value={data.totalLeads} tone="bg-yellow-50 text-yellow-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Books by Class</h2>
          <div className="space-y-2">
            {data.byClass?.length ? (
              data.byClass.map((row) => (
                <div key={row._id} className="flex justify-between text-sm border-b border-gray-100 py-2">
                  <span className="text-gray-600">{row._id || "Unassigned"}</span>
                  <span className="font-semibold text-gray-900">{row.count}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No data yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Recent Leads
          </h2>
          <div className="space-y-2">
            {data.recentLeads?.length ? (
              data.recentLeads.map((lead) => (
                <div key={lead._id} className="text-sm border-b border-gray-100 py-2">
                  <p className="font-semibold text-gray-800">{lead.name || "Unknown"} <span className="text-gray-400 font-normal">· {lead.source}</span></p>
                  <p className="text-gray-500">{lead.phone || lead.email}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No leads yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Recently Added Books</h2>
          <Link href="/admin/books" className="text-sm text-yellow-600 font-semibold hover:underline">
            Manage all books →
          </Link>
        </div>
        <div className="space-y-2">
          {data.recentBooks?.length ? (
            data.recentBooks.map((book) => (
              <div key={book._id} className="flex justify-between text-sm border-b border-gray-100 py-2">
                <span className="text-gray-700 truncate">{book.title}</span>
                <span className="text-gray-400">{book.class}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No books yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminShell title="Dashboard">
        <DashboardContent />
      </AdminShell>
    </AdminGuard>
  );
}
