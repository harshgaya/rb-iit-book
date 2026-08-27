import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const COLLECTION = "products"; // kept as-is to match existing data; exposed to the frontend as "books"

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Exact-match filters (class/subject/category), ANDed with a title-only,
// word-boundary search. This is the fix for the old bug where nav links
// matched a free-text regex against the long `description` field and
// returned unrelated books.
function buildFilter({ class: klass, category, subject, search, inStockOnly }) {
  const filter = {};
  if (klass) filter.class = klass;
  if (category) filter.category = category;
  if (subject) filter.subject = subject;
  if (inStockOnly === "true" || inStockOnly === true) filter.in_stock = true;
  if (search && search.trim() !== "") {
    const safe = escapeRegex(search.trim());
    filter.title = { $regex: `\\b${safe}`, $options: "i" };
  }
  return filter;
}

export async function listBooks({ class: klass, category, subject, search, page = 1, limit = 20, inStockOnly } = {}) {
  const db = await getDb();
  const filter = buildFilter({ class: klass, category, subject, search, inStockOnly });
  const pageNum = Math.max(parseInt(page) || 1, 1);
  const perPage = Math.min(Math.max(parseInt(limit) || 20, 1), 100);

  const [items, total] = await Promise.all([
    db.collection(COLLECTION).find(filter).sort({ created_at: -1 }).skip((pageNum - 1) * perPage).limit(perPage).toArray(),
    db.collection(COLLECTION).countDocuments(filter),
  ]);

  return { items, total, page: pageNum, pages: Math.ceil(total / perPage) || 1 };
}

export async function getBookById(id) {
  const db = await getDb();
  if (!ObjectId.isValid(id)) return null;
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

export async function getHomeData() {
  const db = await getDb();
  const [newlyArrived, homepageProducts, banners, classCounts] = await Promise.all([
    db.collection(COLLECTION).find({ is_active: { $ne: false } }).sort({ created_at: -1 }).limit(8).toArray(),
    db.collection(COLLECTION).find({ is_active: { $ne: false } }).sort({ "ratings.average": -1 }).limit(8).toArray(),
    db.collection("banners").find({ active: { $ne: false } }).sort({ order: 1 }).toArray(),
    db.collection(COLLECTION).aggregate([{ $group: { _id: "$class", count: { $sum: 1 } } }]).toArray(),
  ]);
  return { newlyArrived, homepageProducts, banners, classCounts };
}

// ---- Admin ----

export async function adminListBooks({ page = 1, limit = 20, search } = {}) {
  const db = await getDb();
  const pageNum = Math.max(parseInt(page) || 1, 1);
  const perPage = Math.min(Math.max(parseInt(limit) || 20, 1), 100);
  const filter = {};
  if (search && search.trim() !== "") {
    filter.title = { $regex: escapeRegex(search.trim()), $options: "i" };
  }
  const [items, total] = await Promise.all([
    db.collection(COLLECTION).find(filter).sort({ created_at: -1 }).skip((pageNum - 1) * perPage).limit(perPage).toArray(),
    db.collection(COLLECTION).countDocuments(filter),
  ]);
  return { items, total, page: pageNum, pages: Math.ceil(total / perPage) || 1 };
}

const EDITABLE_FIELDS = [
  "title", "description", "in_stock", "stock_quantity", "market_price",
  "selling_price", "cover_image", "gallery_images", "keys", "class",
  "subject", "category", "amazon_url", "flipkart_url", "is_active", "ratings",
];

function pickEditable(body) {
  const doc = {};
  for (const key of EDITABLE_FIELDS) {
    if (body[key] !== undefined) doc[key] = body[key];
  }
  return doc;
}

export async function createBook(body) {
  const db = await getDb();
  const doc = pickEditable(body);
  doc.title = doc.title || "Untitled Book";
  doc.in_stock = doc.in_stock ?? true;
  doc.stock_quantity = doc.stock_quantity ?? 0;
  doc.is_active = doc.is_active ?? true;
  doc.ratings = doc.ratings || { average: 0, reviews_count: 0 };
  doc.gallery_images = doc.gallery_images || (doc.cover_image ? [doc.cover_image] : []);
  doc.created_at = new Date().toISOString();
  doc.updated_at = new Date();
  const result = await db.collection(COLLECTION).insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export async function updateBook(id, body) {
  const db = await getDb();
  if (!ObjectId.isValid(id)) return null;
  const doc = pickEditable(body);
  doc.updated_at = new Date();
  const result = await db.collection(COLLECTION).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: doc },
    { returnDocument: "after" }
  );
  return result?.value || result;
}

export async function deleteBook(id) {
  const db = await getDb();
  if (!ObjectId.isValid(id)) return false;
  const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
