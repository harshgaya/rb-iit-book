import { NextResponse } from "next/server";
import { getBookById } from "@/lib/server/bookService";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const book = await getBookById(id);
    if (!book) return NextResponse.json({ status: 404, message: "Book not found", data: null }, { status: 404 });
    return NextResponse.json({ status: 200, message: "OK", data: book });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}
