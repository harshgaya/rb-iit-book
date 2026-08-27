import { NextResponse } from "next/server";
import { listBooks } from "@/lib/server/bookService";

// /api/books?class=class-10  /api/books?subject=physics&category=iit  /api/books?search=foundation
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());
    const data = await listBooks(query);
    return NextResponse.json({ status: 200, message: "OK", data });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}
