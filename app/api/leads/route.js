import { NextResponse } from "next/server";
import { addLead } from "@/lib/server/leadService";

export async function POST(req) {
  try {
    const body = await req.json();
    const lead = await addLead(body);
    return NextResponse.json({ status: 200, message: "Thanks, we'll get back to you shortly", data: lead });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}
