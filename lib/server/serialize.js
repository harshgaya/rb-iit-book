// Mongo docs contain ObjectId/Date instances, which Next.js can't pass
// from a Server Component to a Client Component as props directly.
// Call this right before handing DB results to a "use client" component.
export function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}
