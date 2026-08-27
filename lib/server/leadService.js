import { getDb } from "@/lib/mongodb";

const COLLECTION = "query"; // matches the existing collection from the old API - do not rename

export async function addLead({ source, name, email, phone, message, extra }) {
  const db = await getDb();
  const doc = {
    type: source || "contact", // old field name, kept so old admin tooling / exports still work
    source: source || "contact", // new field name, used by the current admin dashboard
    name: name || "",
    email: email || "",
    phone: phone || "",
    subject: "",
    message: message || "",
    extra: extra || {},
    is_seen: false,
    created_at: new Date(),
  };
  const result = await db.collection(COLLECTION).insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export async function listLeads({ page = 1, limit = 20, source } = {}) {
  const db = await getDb();
  const pageNum = Math.max(parseInt(page) || 1, 1);
  const perPage = Math.min(Math.max(parseInt(limit) || 20, 1), 100);
  const filter = {};
  // match either field name so old and new documents both show up
  if (source) filter.$or = [{ source }, { type: source }];
  const [items, total] = await Promise.all([
    db
      .collection(COLLECTION)
      .find(filter)
      .sort({ created_at: -1 })
      .skip((pageNum - 1) * perPage)
      .limit(perPage)
      .toArray(),
    db.collection(COLLECTION).countDocuments(filter),
  ]);
  return {
    items,
    total,
    page: pageNum,
    pages: Math.ceil(total / perPage) || 1,
  };
}

export async function trackEvent(type, meta) {
  const db = await getDb();
  await db
    .collection("website_events")
    .insertOne({ type, meta: meta || {}, created_at: new Date() });
  return true;
}
export async function getUnseenCount() {
  const db = await getDb();
  return db.collection(COLLECTION).countDocuments({ is_seen: { $ne: true } });
}

export async function markLeadSeen(id) {
  const db = await getDb();
  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(id)) return false;
  const result = await db
    .collection(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { is_seen: true } });
  return result.modifiedCount > 0;
}
