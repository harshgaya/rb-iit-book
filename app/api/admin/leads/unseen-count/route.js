import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/server/adminAuth";
import { getUnseenCount } from "@/lib/server/leadService";

export async function GET(req) {
  if (!verifyAdmin(req))
    return NextResponse.json(
      { status: 401, message: "Not authorized", data: null },
      { status: 401 },
    );
  const count = await getUnseenCount();
  return NextResponse.json({ status: 200, message: "OK", data: { count } });
}
