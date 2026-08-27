import { NextResponse } from "next/server";
import { trackEvent } from "@/lib/server/leadService";

export async function POST(req, { params }) {
  try {
    const { type } = await params;
    const meta = await req.json().catch(() => ({}));
    await trackEvent(type, meta);
    return NextResponse.json({ status: 200, message: "OK", data: true });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}
