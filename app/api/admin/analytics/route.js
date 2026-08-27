import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/server/adminAuth";
import { getDashboard } from "@/lib/server/analyticsService";

export async function GET(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  try {
    const data = await getDashboard();
    return NextResponse.json({ status: 200, message: "OK", data });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}
