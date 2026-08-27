import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/server/adminAuth";
import { generateUploadUrl } from "@/lib/server/uploadService";

// Returns a presigned S3 PUT url + the final public (CDN) url.
// The browser uploads the file directly to S3 with this url - the file
// itself never passes through our server.
export async function POST(req) {
  if (!verifyAdmin(req)) return NextResponse.json({ status: 401, message: "Not authorized", data: null }, { status: 401 });
  try {
    const { fileName, contentType } = await req.json();
    if (!fileName || !contentType) {
      return NextResponse.json({ status: 400, message: "fileName and contentType are required", data: null }, { status: 400 });
    }
    const data = await generateUploadUrl({ fileName, contentType });
    return NextResponse.json({ status: 200, message: "OK", data });
  } catch (e) {
    return NextResponse.json({ status: 500, message: e.message, data: null }, { status: 500 });
  }
}
