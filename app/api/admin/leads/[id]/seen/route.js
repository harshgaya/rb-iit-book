import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/server/adminAuth";
import { markLeadSeen } from "@/lib/server/leadService";

export async function PUT(req, { params }) {
  if (!verifyAdmin(req))
    return NextResponse.json(
      { status: 401, message: "Not authorized", data: null },
      { status: 401 },
    );
  const { id } = await params;
  const ok = await markLeadSeen(id);
  return NextResponse.json({ status: 200, message: "OK", data: ok });
}
