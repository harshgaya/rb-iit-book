import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/server/adminAuth";
import { listBanners, saveBanner, deleteBanner } from "@/lib/server/bannerService";

export async function GET(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  const data = await listBanners();
  return NextResponse.json({ status: 200, message: "OK", data });
}

export async function POST(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  const body = await req.json();
  const data = await saveBanner(body);
  return NextResponse.json({ status: 200, message: "Banner saved", data });
}

export async function DELETE(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const deleted = await deleteBanner(id);
  return NextResponse.json({ status: 200, message: "Banner deleted", data: deleted });
}
