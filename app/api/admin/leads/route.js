import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/server/adminAuth";
import { listLeads } from "@/lib/server/leadService";

export async function GET(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const data = await listLeads(Object.fromEntries(searchParams.entries()));
  return NextResponse.json({ status: 200, message: "OK", data });
}
