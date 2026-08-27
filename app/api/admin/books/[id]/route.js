import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/server/adminAuth";
import { getBookById, updateBook, deleteBook } from "@/lib/server/bookService";

export async function GET(req, { params }) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) return NextResponse.json({ status: 404, message: "Book not found", data: null }, { status: 404 });
  return NextResponse.json({ status: 200, message: "OK", data: book });
}

export async function PUT(req, { params }) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateBook(id, body);
    if (!updated) return NextResponse.json({ status: 404, message: "Book not found", data: null }, { status: 404 });
    return NextResponse.json({ status: 200, message: "Book updated", data: updated });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  const { id } = await params;
  const deleted = await deleteBook(id);
  if (!deleted) return NextResponse.json({ status: 404, message: "Book not found", data: null }, { status: 404 });
  return NextResponse.json({ status: 200, message: "Book deleted", data: true });
}
