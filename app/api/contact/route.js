import { API_URL } from "@/lib/utils/constants";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📨 Received add-query request:", body);
    const response = await fetch(`${API_URL}/admin/add-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("✅ Query forwarded successfully:", data);
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Error forwarding add-query:", err);
    return NextResponse.json(
      { error: "Failed to submit query" },
      { status: 500 }
    );
  }
}
