import jwt from "jsonwebtoken";

// Returns the decoded payload if the request has a valid admin token,
// otherwise returns null. Route handlers check this and return 401.
export function verifyAdmin(req) {
  const header = req.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) return null;
  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    if (payload.role !== "admin") return null;
    return payload;
  } catch (e) {
    return null;
  }
}
