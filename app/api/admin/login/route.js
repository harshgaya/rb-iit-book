import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import credentials from "@/lib/adminCredentials";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (username === credentials.username && password === credentials.password) {
      const token = jwt.sign({ role: "admin", username }, process.env.JWT_KEY, { expiresIn: "12h" });
      return NextResponse.json({ status: 200, message: "Logged in", data: { token } });
    }
    return NextResponse.json({ status: 401, message: "Invalid username or password", data: null }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}
