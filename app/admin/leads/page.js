"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/admin-guard";
import AdminShell from "@/components/admin/admin-shell";
import { adminGetLeads, adminMarkLeadSeen } from "@/lib/api/api";

function LeadsContent() {
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await adminGetLeads({ page, limit: 20 });
      setLeads(data.items || []);
      setPages(data.pages || 1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [page]);

  async function onMarkSeen(id) {
    await adminMarkLeadSeen(id);
    load();
  }

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Phone / Email</th>
              <th className="px-5 py-3 font-medium">Source</th>
              <th className="px-5 py-3 font-medium">Message</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                  No leads yet
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className={`border-t border-gray-100 ${!lead.is_seen ? "bg-yellow-50" : ""}`}
                >
                  <td className="px-5 py-3 text-gray-900 font-medium">
                    {lead.name}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {lead.phone}
                    <br />
                    {lead.email}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {lead.source || lead.type}
                  </td>
                  <td className="px-5 py-3 text-gray-600 max-w-md whitespace-pre-wrap break-words align-top">
                    {lead.message}
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    {lead.is_seen ? (
                      <span className="text-xs text-gray-400">Seen</span>
                    ) : (
                      <button
                        onClick={() => onMarkSeen(lead._id)}
                        className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full hover:bg-yellow-200"
                      >
                        Mark seen
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium ${p === page ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600"}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminLeadsPage() {
  return (
    <AdminGuard>
      <AdminShell title="Leads">
        <LeadsContent />
      </AdminShell>
    </AdminGuard>
  );
}
