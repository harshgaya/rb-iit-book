import { NextResponse } from "next/server";
import { getHomeData } from "@/lib/server/bookService";

export async function GET() {
  try {
    const data = await getHomeData();
    return NextResponse.json({ status: 200, message: "OK", data });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}
