import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/server/adminAuth";
import { adminListBooks, createBook } from "@/lib/server/bookService";

export async function GET(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  try {
    const { searchParams } = new URL(req.url);
    const data = await adminListBooks(Object.fromEntries(searchParams.entries()));
    return NextResponse.json({ status: 200, message: "OK", data });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}

export async function POST(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  try {
    const body = await req.json();
    const book = await createBook(body);
    return NextResponse.json({ status: 200, message: "Book created", data: book });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}
